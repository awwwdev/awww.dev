import { z } from "zod";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { toast } from "react-hot-toast";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export const schema = z.object({
  firstname: z.string().min(1, "Please enter firstname here"),
  lastname: z.string().min(1, "Please enter firstname here"),
  firstnameFa: z.string().min(1, "Please enter firstname here"),
  lastnameFa: z.string().min(1, "Please enter firstname here"),
});

const Page: NextPage = () => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { userId } = router.query;

  const userMeQ = useGetUserMe();
  const recordQ = useQuery({
    queryKey: ["studentsAccount-1", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user")
        .select("id, firstname, lastname, firstnameFa, lastnameFa")
        .match({ id: userId })
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  console.log("recordQ", recordQ.data)

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.payer.id,
    };
    const { data, error } = await supabase.from("user").update(correctFormValues).eq("id", userId).select().single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: ["studentsAccount-1", userId] });
    queryClient.invalidateQueries({ queryKey: ["studentsAccount-1"] });
  };

  console.log(removeDBHandledKeys(recordQ.data));

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: removeDBHandledKeys(recordQ.data),
    shouldResetOnSuccess: false,
  });

  console.log(form)

  if (!userMeQ.data?.isPayer) {
    return <p>You don&apos;t have access to this page.</p>;
  }

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update {` `}
          <span className="fw-200">Your Info</span>
        </h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <Form.Input name="firstname" required />
          <Form.Input name="lastname" required />
          <Form.Input name="firstnameFa" required />
          <Form.Input name="lastnameFa" required />
        </Form>
      </div>
    )
  );
};

export default Page;

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const { userId } = ctx.params;

  await queryClient.prefetchQuery({
    queryKey: ["studentsAccount-1", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user")
        .select("id, firstname, lastname, firstnameFa, lastnameFa")
        .match({ id: userId })
        .single();
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
  delete res?.id;
  return res;
};
