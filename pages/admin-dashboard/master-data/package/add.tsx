import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import { renderNoData } from "@/components/RenderQ";
import Select from "@/components/Select";
import { getFullName } from "@/utils/formatter";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "packageMasterData-1";
const tableName = "packagePurchased";

export const schema = z.object({
  numberOfSessions: z.string().min(1, "Please enter category's name here"),
  courseId: z.string().min(1, "Please enter course ID"),
  datePackagePurchased: z.string().min(1, "Please enter date package purchased"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet"),
  expertiseId: z.string().min(1, "Please enter expertise ID"),
  isFinishPackageReminderSent: z.string().optional().nullable(),
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
  const expertiseQ = useQuery({
    queryKey: ["expertiseMasterData-2"], // this query is exactly lie in /teacher-dashboard/course so I didn't change the key
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expertise")
        .select(`*, teacher(user(firstname, lastname)),topic(name)`);
      if (error) throw error;
      return data;
    },
  });
  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      isFinishPackageReminderSent:
        formValues?.isFinishPackageReminderSent === "" ? null : formValues?.isFinishPackageReminderSent,
      datePackagePurchased: formValues?.datePackagePurchased ? new Date(formValues?.datePackagePurchased) : null,
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
      <h1 className="H1">Add a new Package record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        <Form.Input name="numberOfSessions" required />

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

        <Form.Input name="datePackagePurchased" type="datetime-local" required />
        <Form.Input name="idInSheet" required />

        {renderNoData(expertiseQ) ?? (
          <TypeHead
            name="expertiseId"
            list="expertise"
            required={true}
            register={form.register}
            options={expertiseQ.data.map((e) => {
              const value = e.id;
              const label = `teacher: ${getFullName(e.teacher.user)} | topic: ${e.topic.name} | id: ${e.id}`;
              return [value, label];
            })}
          />
        )}

        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">Is Finish Package Reminder Sent</span>
        </label>
        <Select
          name="isFinishPackageReminderSent"
          register={form.register}
          options={[
            [true, "YES"],
            [false, "NO"],
            [null, "NULL"],
          ]}
        />
        <ErrMsg name={"isFinishPackageReminderSent"} />
        <br />
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
