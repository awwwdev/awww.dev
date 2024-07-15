import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { renderNoData } from "@/components/RenderQ";
import { toast } from "react-hot-toast";
import useGetUserMe from "@/hooks/useGetUserMe";
import { toLocalISOString } from "@/utils/date-utils";
import TypeHead from "@/components/TypeHead";
import { getFullName } from "@/utils/formatter";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "expertiseMasterData-1";
const tableName = "expertise";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  topicId: z.string().min(1, "Please enter topic ID here"),
  startDate: z.string().min(1, "Please enter start date"),
  endDate: z.string().optional().nullable(),
  sessionPriceInCAD: z.string().min(1, "Please enter sessionPriceInCAD"),
  sessionDurationOnWebsiteInMinute: z.string().min(1, "Please enter session duration on website in minute"),
  teacherId: z.string().min(1, "Please enter teacherId"),
  idInSheet: z.string().min(1, "Please enter teacher ID in Sheet here"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();

  const recordQ = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("*").match({ id }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const topicQ = useQuery({
    queryKey: ["topicMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select("*");
      if (error) throw error;
      return data;
    },
  });
  const teacherQ = useQuery({
    queryKey: ["teacherMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select("*, user(firstname, lastname)");
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      startDate: formValues?.startDate ? new Date(formValues?.startDate) : null,
      endDate: formValues?.endDate ? new Date(formValues?.endDate) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.admin.id,
    };
    const { data, error } = await supabase.from(tableName).update(correctFormValues).eq("id", id).select().single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: [queryKey, id] });
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: {
      ...removeDBHandledKeys(recordQ.data),
      startDate: toLocalISOString(new Date(recordQ.data?.startDate)),
      endDate: toLocalISOString(new Date(recordQ.data?.endDate)),
    },
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Expertise record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />

          {renderNoData(topicQ) ?? (
            <TypeHead
              name="topicId"
              list="topics"
              required={true}
              register={form.register}
              options={topicQ.data.map((topic) => {
                const value = topic.id;
                const label = `name: ${topic.name} | category: ${topic.category} | id: ${topic.id}`;
                return [value, label];
              })}
            />
          )}

          <Form.Input name="startDate" type="datetime-local" required />
          <Form.Input name="endDate" type="datetime-local" />
          <Form.Input name="sessionPriceInCAD" required />
          <Form.Input name="sessionDurationOnWebsiteInMinute" required />

          {renderNoData(teacherQ) ?? (
            <TypeHead
              name="teacherId"
              list="teachers"
              required={true}
              register={form.register}
              options={teacherQ.data.map((teacher) => {
                const value = teacher.id;
                const label = `name: ${getFullName(teacher.user)} | id: ${teacher.id}`;
                return [value, label];
              })}
            />
          )}

          <Form.Input name="idInSheet" required />
        </Form>
      </div>
    )
  );
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const { id } = ctx.params;
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("*").match({ id }).single();
      if (error) throw error;
      return data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const removeDBHandledKeys = (record) => {
  const res = structuredClone(record);
  delete res?.created_at;
  delete res?.updated_at;
  return res;
};
