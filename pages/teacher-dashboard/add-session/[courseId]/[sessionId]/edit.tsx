import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { renderNoData } from "@/components/RenderQ";
import { toast } from "react-hot-toast";
import useGetUserMe from "@/hooks/useGetUserMe";
import { toLocalISOString } from "@/utils/date-utils";
import { getFullName } from "@/utils/formatter";
import Select from "@/components/Select";

const queryKey = "sessionTeacherDash-12";
const tableName = "session";

export const schema = z.object({
  id: z.string().min(1, "Please enter ID here"),
  date: z.string().min(1, "Please enter date"),
  isHeld: z.string().min(1, "Please enter isHeld"),
});

export default function Page() {
  const router = useRouter();
  const { courseId, sessionId } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();

  const courseQ: any = useQuery({
    queryKey: ["courseTeacherDash-12"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, courseStudent(student(user(*)))`)
        .eq("id", courseId);
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const recordQ = useQuery({
    queryKey: [queryKey, sessionId],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select(`*`).match({ id: sessionId }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!sessionId,
  });

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      date: formValues?.date ? new Date(formValues?.date) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.teacher.id,
      isActionDoneByTeacher: true,
    };
    const { data, error } = await supabase
      .from(tableName)
      .update(correctFormValues)
      .eq("id", sessionId)
      .select()
      .single();
    if (error) throw error;
    toast.success("The record is successfully updated");
    queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
    queryClient.invalidateQueries({ queryKey: [queryKey] });

    // Redirect back to the previous page
    router.back();
    router.back();
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

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          {" "}
          Edit <span className="fw-200">session</span>
        </h1>
        {renderNoData(courseQ) ??
          (courseQ.data[0]?.courseStudent && courseQ.data[0]?.courseStudent.length > 0 ? (
            <p className="fw-400 fs-xl">
              {courseQ.data[0]?.courseStudent.map((cs, index) => (
                <span key={cs.student.user.id}>
                  {index > 0 && ", "}
                  {getFullName(cs.student.user)}
                </span>
              ))}
            </p>
          ) : (
            <p>No students found for this course.</p>
          ))}
        <div className="">
          {renderNoData(recordQ) ?? (
            <div>
              <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update Record">
                <div className="sr-only">
                  <Form.Input name="id" required value={sessionId} />
                </div>

                <Form.Input name="date" type="datetime-local" required />

                <label className="flex flex-col gap-1">
                  <span className="c-sand11 fw-500 block capitalize">
                    Was Session Held<sup className="c-red11"> *</sup>
                  </span>
                </label>
                <Select
                  name="isHeld"
                  register={form.register}
                  options={[
                    ["YES", "YES"],
                    ["NO", "NO"],
                  ]}
                  required
                />
                <ErrMsg name={"isHeld"} />
                <br />
              </Form>
            </div>
          )}
        </div>
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
