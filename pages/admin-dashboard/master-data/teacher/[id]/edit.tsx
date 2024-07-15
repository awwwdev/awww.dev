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
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "teacherMasterData-1";
const tableName = "teacher";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  englishFluency: z.string().optional().nullable(),
  paymentDetails: z.string().optional().nullable(),
  profileLink: z.string().optional().nullable(),
  idInSheet: z.string().min(1, "Please enter topic's idInSheet"),
  isActive: z.string().min(1, "Please enter is active here"),
  paymentMethod: z.string().optional().nullable(),
  commissionPercentage: z.string().optional().nullable(),
  currencyPrefered: z.string().optional().nullable(),
  dateJoined: z.string().optional().nullable(),
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

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      currencyPrefered: formValues?.currencyPrefered === "" ? null : formValues?.currencyPrefered,
      paymentMethod: formValues?.paymentMethod === "" ? null : formValues?.paymentMethod,
      profileLink: formValues?.profileLink === "" ? null : formValues?.profileLink,
      englishFluency: formValues?.englishFluency === "" ? null : formValues?.englishFluency,
      commissionPercentage: formValues?.commissionPercentage === "" ? null : formValues?.commissionPercentage,
      dateJoined: formValues?.dateJoined ? new Date(formValues?.dateJoined) : null,
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
      dateJoined: toLocalISOString(new Date(recordQ.data?.dateJoined)),
    },
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Teacher record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">English Fluency</span>
          </label>
          <Select
            name="englishFluency"
            register={form.register}
            options={[
              ["Beginner", "Beginner"],
              ["Intermediate", "Intermediate"],
              ["Advanced", "Advanced"],
              ["Fluent", "Fluent"],
            ]}
          />
          <ErrMsg name={"englishFluency"} />
          <br />

          <Form.Input name="paymentDetails" />
          <Form.Input name="profileLink" />
          <Form.Input name="idInSheet" required />

          <label className="flex flex-col gap-1">
            <span className="c-sand11 fw-500 block capitalize">
              Is Active<sup className="c-red11"> *</sup>
            </span>
          </label>
          <Select
            name="isActive"
            register={form.register}
            options={[
              [true, "YES"],
              [false, "NO"],
            ]}
            required
          />
          <ErrMsg name={"isActive"} />
          <br />

          <Form.Input name="paymentMethod" />
          <Form.Input name="commissionPercentage" />
          <Form.Input name="currencyPrefered" />
          <Form.Input name="dateJoined" type="datetime-local" />
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
