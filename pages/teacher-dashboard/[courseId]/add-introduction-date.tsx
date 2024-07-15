import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, useFormHook } from "@/components/FormComps";
import { useState } from "react";
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
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const minDate = tenDaysAgo.toISOString().split("T")[0];

  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
  const maxDate = thirtyDaysLater.toISOString().split("T")[0];

  const router = useRouter();
  const { courseId } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();

  const [introMeetingScheduled, setIntroMeetingScheduled] = useState(null);

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
        {introMeetingScheduled === null && (
          <div className="space-y-2">
            <label className="flex flex-col gap-1">
              <span className="c-sand11 fw-500 block capitalize">
                Has the introductory meeting been scheduled?
                <sup className="c-red11"> *</sup>
              </span>
            </label>
            <select
              value={introMeetingScheduled === null ? "" : introMeetingScheduled ? "YES" : "NO"}
              onChange={(e) => setIntroMeetingScheduled(e.target.value === "YES")}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        )}

        {introMeetingScheduled === true && (
          <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
            <div className="sr-only">
              <Form.Input name="id" required value={courseId} />
              <Form.Input name="introductionStatus" required value="YES" />
            </div>

            <Form.Input name="introductionDate" label="Introduction Date" type="date" min={minDate} max={maxDate} required />
            <Form.Input name="reasonForUnsuccessfulIntroduction" label="Comment" />
          </Form>
        )}
        {introMeetingScheduled === false && (
          <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
            <div className="sr-only">
              <Form.Input name="id" required value={courseId} />
            </div>
            <Form.Input name="reasonForUnsuccessfulIntroduction" label="What was the problem?" required />
          </Form>
        )}
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
