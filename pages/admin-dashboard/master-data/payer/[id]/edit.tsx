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
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "payerMasterData-1";
const tableName = "payer";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  dashboardLink: z.string().optional().nullable(),
  howLearnedAboutUs: z.string().optional().nullable(),
  secondPayerName: z.string().optional().nullable(),
  idInStudentSheet: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
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
      dashboardLink: formValues?.dashboardLink === "" ? null : formValues?.dashboardLink,
      howLearnedAboutUs: formValues?.howLearnedAboutUs === "" ? null : formValues?.howLearnedAboutUs,
      secondPayerName: formValues?.secondPayerName === "" ? null : formValues?.secondPayerName,
      idInStudentSheet: formValues?.idInStudentSheet === "" ? null : formValues?.idInStudentSheet,
      name: formValues?.name === "" ? null : formValues?.name,
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
    defaultValues: removeDBHandledKeys(recordQ.data),
    shouldResetOnSuccess: false,
  });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update Payer record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="dashboardLink" />
          <Form.Input name="howLearnedAboutUs" />
          <Form.Input name="secondPayerName" />
          <Form.Input name="idInStudentSheet" />
          <Form.Input name="name" />
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
