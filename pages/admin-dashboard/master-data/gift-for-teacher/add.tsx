import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { rom "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import Select from "@/components/Select";
import { renderNoData } from "@/components/RenderQ";
import { getFullName } from "@/utils/formatter";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "giftForTeacherMasterData-1";
const tableName = "giftForTeacher";

export const schema = z.object({
  date: z.string().min(1, "Please enter date here"),
  amountInCAD: z.string().min(1, "Please enter Amount in CAD here"),
  payerId: z.string().optional().nullable(),
  teacherId: z.string().min(1, "Please enter teacher ID"),
  reason: z.string().min(1, "Please enter reason here"),
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();
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
      payerId: formValues?.payerId === "" ? null : formValues?.payerId,
      date: formValues?.date ? new Date(formValues?.date) : null,
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
      <h1 className="H1">Add a new Gift For Teacher record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        <Form.Input name="date" type="datetime-local" required />
        <Form.Input name="amountInCAD" required />

        {renderNoData(payerQ) ?? (
          <TypeHead
            name="payerId"
            list="payers"
            required={false}
            register={form.register}
            options={payerQ.data.map((payer) => {
              const value = payer.id;
              const label = `name: ${getFullName(payer.user)} | id: ${payer.id}`;
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

        <Form.Input name="reason" required />
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
