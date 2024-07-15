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

const queryKey = "giftForTeacherMasterData-1";
const tableName = "giftForTeacher";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  date: z.string().min(1, "Please enter date here"),
  amountInCAD: z.string().min(1, "Please enter Amount in CAD here"),
  payerId: z.string().optional().nullable(),
  teacherId: z.string().min(1, "Please enter teacher ID"),
  reason: z.string().min(1, "Please enter reason here"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
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

  const teacherQ = useQuery({
    queryKey: ["teacherMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select("*, user(firstname, lastname)");
      if (error) throw error;
      return data;
    },
  });
  const payerQ = useQuery({
    queryKey: ["payerMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payer").select("*, user(firstname, lastname)");
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      payerId: formValues?.payerId === "" ? null : formValues?.payerId,
      date: formValues?.date ? new Date(formValues?.date) : null,
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
      date: toLocalISOString(new Date(recordQ.data?.date)),
    },
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Gift For Teacher record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="date" type="datetime-local" required />
          <Form.Input name="amountInCAD" required />

          {renderNoData(payerQ) ?? (
            <TypeHead
              name="payerId"
              list="payers"
              required={false}
              register={form.register}
              options={payerQ.data.map((payer) => {
                const value = payer.id;
                const label = `name: ${getFullName(payer.user)} | id: ${payer.id}`;
                return [value, label];
              })}
            />
          )}

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

          <Form.Input name="reason" required />
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
