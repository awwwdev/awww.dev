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
import Select from "@/components/Select";
import { toLocalISOString } from "@/utils/date-utils";
import TypeHead from "@/components/TypeHead";
import { getFullName, toReadableDate } from "@/utils/formatter";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "sessionMasterData-1";
const tableName = "session";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  date: z.string().min(1, "Please enter date here"),
  packagePurchasedId: z.string().optional().nullable(),
  isHeld: z.string().min(1, "Please enter isHeld here"),
  idInSheet: z.string().min(1, "Please enter topic's idInSheet"),
  calculatedCost_helper: z.string().optional().nullable(),
  rateMultiplierInSheet: z.string().optional().nullable(),
  courseId: z.string().min(1, "Please enter course ID"),
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

  const courseQ = useQuery({
    queryKey: ["courseMasterData-2"], // this query is exactly lie in /teacher-dashboard/course so I didn't change the key
    queryFn: async () => {
      const { data, error } = await supabase.from("course").select(
        `
          *,
          topic(*),
          courseStudent(
            payer(user(*)),
            student(user(*))
          )
          `
      );
      if (error) throw error;
      return data;
    },
  });
  const packageQ = useQuery({
    queryKey: ["packageMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(`id, numberOfSessions, datePackagePurchased`);
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      packagePurchasedId: formValues?.packagePurchasedId === "" ? null : formValues?.packagePurchasedId,
      calculatedCost_helper: formValues?.calculatedCost_helper === "" ? null : formValues?.calculatedCost_helper,
      rateMultiplierInSheet: formValues?.rateMultiplierInSheet === "" ? null : formValues?.rateMultiplierInSheet,
      date: formValues?.date ? new Date(formValues?.date) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.admin.id,
    };
    const { data, error } = await supabase.from(tableName).update(correctFormValues).eq("id", id).select().single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: [queryKey, id] });
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
          Update Session record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="date" type="datetime-local" required />

          {renderNoData(packageQ) ?? (
            <TypeHead
              name="packagePurchasedId"
              list="packages"
              required={false}
              register={form.register}
              options={packageQ.data.map((p) => {
                const value = p.id;
                const label = `date package purchased: ${toReadableDate(
                  p.datePackagePurchased
                )} | number of sessions: ${p.numberOfSessions}`;
                return [value, label];
              })}
            />
          )}

          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">
              Was Session Held<sup className="c-red11"> *</sup>
            </span>
          </label>
          <Select
            name="isHeld"
            register={form.register}
            options={[
              ["YES", "YES"],
              ["NO", "NO"],
              ["CON", "A conflict happened"],
            ]}
            required
          />
          <ErrMsg name={"isHeld"} />
          <br />

          <Form.Input name="idInSheet" required />
          <Form.Input name="calculatedCost_helper" />
          <Form.Input name="rateMultiplierInSheet" />

          {renderNoData(courseQ) ?? (
            <TypeHead
              name="courseId"
              list="courses"
              required={true}
              register={form.register}
              options={courseQ.data.map((course) => {
                const value = course.id;
                const studentNames = course.courseStudent.map((c) => getFullName(c.student.user)).join(", ");
                const label = `students: ${studentNames} | topic: ${course.topic.name} | payer: ${course.courseStudent
                  .map((cs) => getFullName(cs.payer.user))
                  .join(", ")} | course id: ${course.id}`;
                return [value, label];
              })}
            />
          )}
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
  // if (record?.date) {
  //   res.date = (new Date(record.date)).toLocaleString();
  //   console.log("🚀 ~ res.date:", res.date)
  // }
  return res;
};
