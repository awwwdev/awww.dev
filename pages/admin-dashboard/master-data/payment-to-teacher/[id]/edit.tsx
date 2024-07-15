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
import useAdminAccess from "@/hooks/useAdminAccess";
import { getFullName } from '@/utils/formatter';

const queryKey = "paymentToTeacherMasterData-1";
const tableName = "paymentToTeacher";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  date: z.string().optional().nullable(),
  amountPayedInIRR: z.string().optional().nullable(),
  amountPayedInCAD: z.string().optional().nullable(),
  correctionAmountInCAD: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  paymentConfirmation: z.string().optional().nullable(),
  totalAmountInCAD: z.string().min(1, "Please enter total amount in CAD"),
  isAutoExchangeRateId: z.string().optional().nullable(),
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

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      description: formValues?.description === "" ? null : formValues?.description,
      paymentConfirmation: formValues?.paymentConfirmation === "" ? null : formValues?.paymentConfirmation,
      amountPayedInIRR: formValues?.amountPayedInIRR === "" ? null : formValues?.amountPayedInIRR,
      amountPayedInCAD: formValues?.amountPayedInCAD === "" ? null : formValues?.amountPayedInCAD,
      correctionAmountInCAD: formValues?.correctionAmountInCAD === "" ? null : formValues?.correctionAmountInCAD,
      isAutoExchangeRateId: formValues?.isAutoExchangeRateId === "" ? null : formValues?.isAutoExchangeRateId,
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
          Update Payment To Teacher record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="idInSheet" required />

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

          <Form.Input name="date" type="datetime-local" />
          <Form.Input name="amountPayedInIRR" />
          <Form.Input name="amountPayedInCAD" />
          <Form.Input name="description" />
          <Form.Input name="paymentConfirmation" />
          <Form.Input name="totalAmountInCAD" required />

          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">Is Auto Exchange Rate ID</span>
          </label>
          <Select
            name="isAutoExchangeRateId"
            register={form.register}
            options={[
              [true, "YES"],
              [false, "NO"],
              [null, "NULL"],
            ]}
          />
          <ErrMsg name={"isAutoExchangeRateId"} />
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
