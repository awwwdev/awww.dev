import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, useFormHook } from "@/components/FormComps";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { renderNoData } from "@/components/RenderQ";
import { toast } from "react-hot-toast";
import useGetUserMe from "@/hooks/useGetUserMe";

const queryKey = "courseTeacherDash-27";
const tableName = "course";

export const schema = z.object({
  id: z.string().min(1, "Please enter course ID here"),
  introductionStatus: z.string().optional().nullable(),
  introductionDate: z.string().optional().nullable(),
  reasonForUnsuccessfulIntroduction: z.string().optional().nullable(),
});

export default function Page() {
  const router = useRouter();
  const { courseId } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();

  const recordQ = useQuery({
    queryKey: [queryKey, courseId],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("*").match({ id: courseId }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      introductionStatus: formValues?.introductionStatus === "" ? null : formValues?.introductionStatus,
      reasonForUnsuccessfulIntroduction:
        formValues?.reasonForUnsuccessfulIntroduction === "" ? null : formValues?.reasonForUnsuccessfulIntroduction,
      introductionDate: formValues?.introductionDate ? new Date(formValues?.introductionDate) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.teacher.id,
    };
    const { data, error } = await supabase
      .from(tableName)
      .update(correctFormValues)
      .eq("id", courseId)
      .select()
      .single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: [queryKey, courseId] });
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: {
      ...removeDBHandledKeys(recordQ.data),
    },
    shouldResetOnSuccess: false,
  });

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">Update Course record{` `}</h1>
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
          <div className="sr-only">
            <Form.Input name="id" required value={courseId} />
          </div>
          <Form.Input name="introductionStatus" required value="YES" />
          <Form.Input name="introductionDate" label="Introduction Date" type="date" required />
          <Form.Input name="reasonForUnsuccessfulIntroduction" label="Comment" />
        </Form>
      </div>
    )
  );
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const { id } = ctx.params;

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
