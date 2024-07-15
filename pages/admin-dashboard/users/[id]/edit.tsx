import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { renderNoData } from "@/components/RenderQ";
import { toast } from "react-hot-toast";
import { schema } from "@/components/forms/AddUserForm";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "topicMasterData-1";
const tableName = "user";

export default function Page() {
  const hasUserManagementAccess = useAdminAccess("hasUserManagementAccess");
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const recordQ = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("*").match({ id: id }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const onSubmit = async (formValues) => {
    /*     console.log("🚀 ~ formValues:", formValues); */
    const { data, error } = await supabase.from(tableName).update(formValues).eq("id", id).select().single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: [queryKey, id] });
  };

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: removeDBHandledKeys(recordQ.data),
    shouldResetOnSuccess: false,
  });

  if (!hasUserManagementAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div className="space-y-8">
        <h1 className="H1">Update User Info {` `}</h1>
        <p className="fw-200">id: {id}</p>
        <div>
          <p className="info-line">
            For privacy and security reasons, password and emails can change only by users themselves.
          </p>
          <p className="info-line">Users can also edit the same data through in their account.</p>
        </div>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          {/* <Form.Input name="email" required disabled /> */}
          <Form.Input name="firstname" required />
          <Form.Input name="lastname" required />
          <Form.Input name="firstnameFa" required />
          <Form.Input name="lastnameFa" required />
          <Form.Input name="countryCode" />
          <Form.Input name="phoneCountryCode" />
          <Form.Input name="phone" />
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
  delete res.id;
  delete res.created_at;
  delete res.updated_at;
  return res;
};
