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

const queryKey = "paymentToTeacherMasterData-1";
const tableName = "paymentToTeacher";

export const schema = z.object({
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  date: z.string().optional().nullable(),
  amountPayedInIRR: z.string().optional().nullable(),
  amountPayedInCAD: z.string().optional().nullable(),
  correctionAmountInCAD: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  paymentConfirmation: z.string().optional().nullable(),
  totalAmountInCAD: z.string().min(1, "Please enter total amount in CAD"),
  isAutoExchangeRateId: z.string().optional().nullable(),
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
  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      description: formValues?.description === "" ? null : formValues?.description,
      paymentConfirmation: formValues?.paymentConfirmation === "" ? null : formValues?.paymentConfirmation,
      amountPayedInIRR: formValues?.amountPayedInIRR === "" ? null : formValues?.amountPayedInIRR,
      amountPayedInCAD: formValues?.amountPayedInCAD === "" ? null : formValues?.amountPayedInCAD,
      correctionAmountInCAD: formValues?.correctionAmountInCAD === "" ? null : formValues?.correctionAmountInCAD,
      isAutoExchangeRateId: formValues?.isAutoExchangeRateId === "" ? null : formValues?.isAutoExchangeRateId,
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

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <h1 className="H1">Add a new Payment To Teacher record</h1>
      <div className="snack-info">
        <p>
          If a portion of the payment is for correcting previous debts or ect. add it the field below. It can be
          negative too.{" "}
        </p>
        <p>
          For example, if a teacher received 10 CAD more than he/she was supposed to in the last month enter -10. And if
          that teacher has held 200 CAD worth of session in since last payment, the payment amount would be 190.
        </p>
        <p>You can add descriptions, so teachers know what the correction amount is for.</p>
      </div>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        <Form.Input name="idInSheet" required />

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

        <Form.Input name="date" type="datetime-local" />
        <Form.Input name="amountPayedInIRR" />
        <Form.Input name="amountPayedInCAD" />

        <Form.Input name="correctionAmountInCAD" />
        <Form.Input name="description" />
        <Form.Input name="paymentConfirmation" />
        <Form.Input name="totalAmountInCAD" required />

        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">Is Auto Exchange Rate ID</span>
        </label>
        <Select
          name="isAutoExchangeRateId"
          register={form.register}
          options={[
            [true, "YES"],
            [false, "NO"],
            [null, "NULL"],
          ]}
        />
        <ErrMsg name={"isAutoExchangeRateId"} />
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
