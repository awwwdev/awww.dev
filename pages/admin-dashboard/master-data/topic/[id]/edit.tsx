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

const queryKey = "topicMasterData-1";
const tableName = "topic";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  category: z.string().min(1, "Please enter category's name here"),
  name: z.string().min(1, "Please enter topic's name"),
  nameFa: z.string().min(1, "Please enter topic name in Farsi"),
  idInSheet: z.string().min(1, "Please enter topic's idInSheet"),
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
          Update Topic record{` `}
          <span className="fw-200">id: {id}</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="id" required disabled />
          <Form.Input name="category" required />
          <Form.Input name="name" required />
          <Form.Input name="nameFa" required />
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
