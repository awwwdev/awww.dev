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
import { getFullName } from "@/utils/formatter";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "packageMasterData-1";
const tableName = "packagePurchased";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  numberOfSessions: z.string().min(1, "Please enter category's name here"),
  courseId: z.string().min(1, "Please enter course ID"),
  datePackagePurchased: z.string().min(1, "Please enter date package purchased"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet"),
  expertiseId: z.string().min(1, "Please enter expertise ID"),
  isFinishPackageReminderSent: z.string().optional().nullable(),
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
  const expertiseQ = useQuery({
    queryKey: ["expertiseMasterData-2"], // this query is exactly lie in /teacher-dashboard/course so I didn't change the key
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expertise")
        .select(`*, teacher(user(firstname, lastname)),topic(name)`);
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      isFinishPackageReminderSent:
        formValues?.isFinishPackageReminderSent === "" ? null : formValues?.isFinishPackageReminderSent,
      datePackagePurchased: formValues?.datePackagePurchased ? new Date(formValues?.datePackagePurchased) : null,
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
      datePackagePurchased: toLocalISOString(new Date(recordQ.data?.datePackagePurchased)),
    },
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Package record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="numberOfSessions" required />

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

          <Form.Input name="datePackagePurchased" type="datetime-local" required />
          <Form.Input name="idInSheet" required />

          {renderNoData(expertiseQ) ?? (
            <TypeHead
              name="expertiseId"
              list="expertise"
              required={true}
              register={form.register}
              options={expertiseQ.data.map((e) => {
                const value = e.id;
                const label = `teacher: ${getFullName(e.teacher.user)} | topic: ${e.topic.name} | id: ${e.id}`;
                return [value, label];
              })}
            />
          )}

          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">Is Finish Package Reminder Sent</span>
          </label>
          <Select
            name="isFinishPackageReminderSent"
            register={form.register}
            options={[
              [true, "YES"],
              [false, "NO"],
              [null, "NULL"],
            ]}
          />
          <ErrMsg name={"isFinishPackageReminderSent"} />
          <br />
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
