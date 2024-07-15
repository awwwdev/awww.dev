import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import { renderNoData } from "@/components/RenderQ";
import { getFullName } from "@/utils/formatter";
import Select from "@/components/Select";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "courseMasterData-1";
const tableName = "course";

export const schema = z.object({
  topicId: z.string().min(1, "Please enter topic ID here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  requestedSessionDurationInMinute: z.string().min(1, "Please enter class duration in minutes"),
  introductionStatus: z.string().optional().nullable(),
  introductionDate: z.string().optional().nullable(),
  reasonForUnsuccessfulIntroduction: z.string().optional().nullable(),
  requestMessage: z.string().optional().nullable(),
  requestDate: z.string().min(1, "Please enter request date"),
  newFeedbackFormRawUrl: z.string().optional().nullable(),
  newFeedbackFormHyperlink: z.string().optional().nullable(),
  rateOverwrite: z.string().optional().nullable(),
  idInSheet: z.string().min(1, "Please enter ID in Sheet"),
  payerId: z.string().min(1, "Please enter payer ID"),
  numberOfStudents: z.string().min(1, "Please enter number of students"),
  isWorkshop: z.string().min(1, "Please enter number of students"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();
  const topicQ = useQuery({
    queryKey: ["topicMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select("*");
      if (error) throw error;
      return data;
    },
  });
  const teacherQ = useQuery({
    queryKey: ["teacherMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select("*, user(firstname, lastname)");
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
      introductionStatus: formValues?.introductionStatus === "" ? null : formValues?.introductionStatus,
      reasonForUnsuccessfulIntroduction:
        formValues?.reasonForUnsuccessfulIntroduction === "" ? null : formValues?.reasonForUnsuccessfulIntroduction,
      newFeedbackFormRawUrl: formValues?.newFeedbackFormRawUrl === "" ? null : formValues?.newFeedbackFormRawUrl,
      newFeedbackFormHyperlink:
        formValues?.newFeedbackFormHyperlink === "" ? null : formValues?.newFeedbackFormHyperlink,
      requestMessage: formValues?.requestMessage === "" ? null : formValues?.requestMessage,
      rateOverwrite: formValues?.rateOverwrite === "" ? null : formValues?.rateOverwrite,
      numberOfStudents: formValues?.numberOfStudents === "" ? null : formValues?.numberOfStudents,
      introductionDate: formValues?.introductionDate ? new Date(formValues?.introductionDate) : null,
      requestDate: formValues?.requestDate ? new Date(formValues?.requestDate) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.admin.id,
    };
    const { data, error } = await supabase.from(tableName).insert(correctFormValues).select().single();
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    setAddedRecord(data);
  };
  const form = useFormHook({ schema, onSubmit });

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <h1 className="H1">Add a new Course record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        {renderNoData(topicQ) ?? (
          <TypeHead
            name="topicId"
            list="topics"
            required={true}
            register={form.register}
            options={topicQ.data.map((topic) => {
              const value = topic.id;
              const label = `name: ${topic.name} | category: ${topic.category} | id: ${topic.id}`;
              return [value, label];
            })}
          />
        )}

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

        <Form.Input name="numberOfStudents" required />
        <Form.Input name="requestedSessionDurationInMinute" required />

        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">Introduction Status</span>
        </label>
        <Select
          name="introductionStatus"
          register={form.register}
          options={[
            ["YES", "YES"],
            ["NO", "NO"],
          ]}
        />
        <ErrMsg name={"introductionStatus"} />
        <br />

        <Form.Input name="introductionDate" type="datetime-local" />
        <Form.Input name="reasonForUnsuccessfulIntroduction" />
        <Form.Input name="requestMessage" />
        <Form.Input name="requestDate" type="datetime-local" required />
        <Form.Input name="newFeedbackFormRawUrl" />
        <Form.Input name="newFeedbackFormHyperlink" />
        <Form.Input name="rateOverwrite" />
        <Form.Input name="idInSheet" required />

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
        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">
            Is Workshop<sup className="c-red11"> *</sup>
          </span>
        </label>
        <Select
          name="isWorkshop"
          register={form.register}
          options={[
            [true, "YES"],
            [false, "NO"],
          ]}
          required
        />
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
