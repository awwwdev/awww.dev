import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { renderNoData } from "@/components/RenderQ";
import Select from "@/components/Select";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "feedbackMasterData-1";
const tableName = "feedback";

export const schema = z.object({
  courseId: z.string(),
  studentRating: z.string().min(1, "Please enter student rating"),
  studentFeedback: z.string().optional().nullable(),
  payerId: z.string().min(1, "Please enter payer ID"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();
  const courseQ = useQuery({
    queryKey: ["courseMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("course").select(
        `
          *,
          topic(*),
          courseStudent(
            payer(user(*)),
            student(user(*))
          )
          `
      );
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

  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      studentFeedback: formValues?.studentFeedback === "" ? null : formValues?.studentFeedback,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.admin.id,
    };
    const { data, error } = await supabase.from(tableName).insert(correctFormValues).select().single();
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    setAddedRecord(data);
  };
  const form = useFormHook({ schema, onSubmit });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page.</p>;

  return (
    <div>
      <h1 className="H1">Add a new Feedback record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        {renderNoData(courseQ) ?? (
          <TypeHead
            name="courseId"
            list="courses"
            required={true}
            register={form.register}
            options={courseQ.data.map((course) => {
              const value = course.id;
              const studentNames = course.courseStudent.map((c) => getFullName(c.student.user)).join(", ");
              const label = `students: ${studentNames} | topic: ${course.topic.name} | payer: ${course.courseStudent
                .map((cs) => getFullName(cs.payer.user))
                .join(", ")} | course id: ${course.id}`;
              return [value, label];
            })}
          />
        )}

        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">
            Student Rating<sup className="c-red11"> *</sup>
          </span>
        </label>
        <Select
          name="studentRating"
          register={form.register}
          options={[
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
          ]}
          required
        />
        <ErrMsg name={"studentRating"} />
        <br />
        <Form.Input name="studentFeedback" />
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
        <Form.Input name="idInSheet" required />
      </Form>

      {addedRecord && (
        <div className="snack-success">
          <p className="H2">The Record is successfully added to the database. </p>
          <p>
            <span className="H3">Added Record:</span>
            <br />
            <pre>{JSON.stringify(addedRecord, null, 2)}</pre>
          </p>
          <p>You can add more records by filling out the form again.</p>
        </div>
      )}
    </div>
  );
}
