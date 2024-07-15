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
import { getFullName } from '@/utils/formatter';
import useAdminAccess from '@/hooks/useAdminAccess';

const queryKey = "courseMasterData-1";
const tableName = "course";

export const schema = z.object({
  id: z.string().min(1, "Please enter course ID here"),
  topicId: z.string().min(1, "Please enter topic ID here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  requestedSessionDurationInMinute: z.string().min(1, "Please enter class duration in minutes"),
  introductionStatus: z.string().optional().nullable(),
  introductionDate: z.string().optional().nullable(),
  reasonForUnsuccessfulIntroduction: z.string().optional().nullable(),
  requestMessage: z.string().optional().nullable(),
  requestDate: z.string().min(1, "Please enter request date"),
  newFeedbackFormRawUrl: z.string().optional().nullable(),
  newFeedbackFormHyperlink: z.string().optional().nullable(),
  rateOverwrite: z.string().optional().nullable(),
  idInSheet: z.string().min(1, "Please enter ID in Sheet"),
  payerId: z.string().min(1, "Please enter payer ID"),
  numberOfStudents: z.string().min(1, "Please enter number of students"),
  isWorkshop: z.string().min(1, "Please enter number of students"),
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
      introductionStatus: formValues?.introductionStatus === "" ? null : formValues?.introductionStatus,
      reasonForUnsuccessfulIntroduction:
        formValues?.reasonForUnsuccessfulIntroduction === "" ? null : formValues?.reasonForUnsuccessfulIntroduction,
      newFeedbackFormRawUrl: formValues?.newFeedbackFormRawUrl === "" ? null : formValues?.newFeedbackFormRawUrl,
      newFeedbackFormHyperlink:
        formValues?.newFeedbackFormHyperlink === "" ? null : formValues?.newFeedbackFormHyperlink,
      requestMessage: formValues?.requestMessage === "" ? null : formValues?.requestMessage,
      rateOverwrite: formValues?.rateOverwrite === "" ? null : formValues?.rateOverwrite,
      numberOfStudents: formValues?.numberOfStudents === "" ? null : formValues?.numberOfStudents,
      introductionDate: formValues?.introductionDate ? new Date(formValues?.introductionDate) : null,
      requestDate: formValues?.requestDate ? new Date(formValues?.requestDate) : null,
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
      introductionDate: toLocalISOString(new Date(recordQ.data?.introductionDate)),
      requestDate: toLocalISOString(new Date(recordQ.data?.requestDate)),
    },
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Course record{` `}
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
          <Form.Input name="numberOfStudents" required />
          <Form.Input name="requestedSessionDurationInMinute" required />

          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">Introduction Status</span>
          </label>
          <Select
            name="introductionStatus"
            register={form.register}
            options={[
              ["YES", "YES"],
              ["NO", "NO"],
              [null, "NULL"],
            ]}
          />
          <ErrMsg name={"introductionStatus"} />
          <br />

          <Form.Input name="introductionDate" type="datetime-local" />
          <Form.Input name="reasonForUnsuccessfulIntroduction" />
          <Form.Input name="requestMessage" />
          <Form.Input name="requestDate" type="datetime-local" required />
          <Form.Input name="newFeedbackFormRawUrl" />
          <Form.Input name="newFeedbackFormHyperlink" />
          <Form.Input name="rateOverwrite" />
          <Form.Input name="idInSheet" required />

          {renderNoData(payerQ) ?? (
            <TypeHead
              name="payerId"
              list="payers"
              required={true}
              register={form.register}
              options={payerQ.data.map((payer) => {
                const value = payer.id;
                const label = `name: ${getFullName(payer.user)} | id: ${payer.id}`;
                return [value, label];
              })}
            />
          )}
          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">
              Is Workshop<sup className="c-red11"> *</sup>
            </span>
          </label>
          <Select
            name="isWorkshop"
            register={form.register}
            options={[
              [true, "YES"],
              [false, "NO"],
            ]}
            required
          />

          <Form.Input name="progressReport" />
          <Form.Input name="topicsCovered" />
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
