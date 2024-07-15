import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "promotionMasterData-1";
const tableName = "promotion";

export const schema = z.object({
  name: z.string().min(1, "Please enter promotion name"),
  promotionType: z.string().min(1, "Please enter promotion type here"),
  startDate: z.string().min(1, "Please enter start date"),
  endDate: z.string().optional().nullable(),
  constantAmountInCAD: z.string().optional().nullable(),
  percentage: z.string().optional().nullable(),
  idInSheet: z.string().min(1, "Please enter topic's idInSheet"),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();
  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      constantAmountInCAD: formValues?.constantAmountInCAD === "" ? null : formValues?.constantAmountInCAD,
      percentage: formValues?.percentage === "" ? null : formValues?.percentage,
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

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page.</p>;

  return (
    <div>
      <h1 className="H1">Add a new Promotion record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
        <Form.Input name="name" required />
        <Form.Input name="promotionType" required />
        <Form.Input name="startDate" type="datetime-local" required />
        <Form.Input name="endDate" type="datetime-local" />
        <Form.Input name="constantAmountInCAD" />
        <Form.Input name="percentage" />
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
