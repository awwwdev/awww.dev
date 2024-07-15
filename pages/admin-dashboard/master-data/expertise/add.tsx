import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import { renderNoData } from "@/components/RenderQ";
import { getFullName } from "@/utils/formatter";
import Select from "@/components/Select";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "expertiseMasterData-1";
const tableName = "expertise";

export const schema = z.object({
  topicId: z.string().min(1, "Please enter topic ID here"),
  startDate: z.string().min(1, "Please enter start date"),
  endDate: z.string().optional().nullable(),
  sessionPriceInCAD: z.string().min(1, "Please enter sessionPriceInCAD"),
  sessionDurationOnWebsiteInMinute: z.string().min(1, "Please enter session duration on website in minute"),
  teacherId: z.string().min(1, "Please enter teacherId"),
  idInSheet: z.string().min(1, "Please enter teacher ID in Sheet here"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");

  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
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
  const userMeQ = useGetUserMe();
  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      startDate: formValues?.startDate ? new Date(formValues?.startDate) : null,
      endDate: formValues?.endDate ? new Date(formValues?.endDate) : null,
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
      <h1 className="H1">Add a new Expertise record</h1>
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

        <Form.Input name="startDate" type="datetime-local" required />
        <Form.Input name="endDate" type="datetime-local" />
        <Form.Input name="sessionPriceInCAD" required />
        <Form.Input name="sessionDurationOnWebsiteInMinute" required />

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
