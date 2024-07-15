import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import useGetUserMe from "@/hooks/useGetUserMe";
import Select from "@/components/Select";
import { renderNoData } from "@/components/RenderQ";
import { getFullName, toReadableDate } from "@/utils/formatter";
import TypeHead from "@/components/TypeHead";
import useAdminAccess from "@/hooks/useAdminAccess";

const queryKey = "paymentByPayerMasterData-1";
const tableName = "paymentByPayer";

export const schema = z.object({
  payerId: z.string().min(1, "Please enter payer ID here"),
  date: z.string().min(1, "Please enter date"),
  amountBeforeDiscountsInCAD: z.string().min(1, "Please enter amount before discounts in CAD"),
  method: z.string().min(1, "Please enter method here"),
  paymentDetails: z.string().optional().nullable(),
  idInSheet: z.string().min(1, "Please enter ID in Sheet here"),
  nameOnTheCard: z.string().optional().nullable(),
  promotionId: z.string().optional().nullable(),
  amountActuallyPaidInCAD: z.string().optional().nullable(),
});

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const userMeQ = useGetUserMe();
  const payerQ = useQuery({
    queryKey: ["payerMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payer").select("*, user(firstname, lastname)");
      if (error) throw error;
      return data;
    },
  });
  const promotionQ = useQuery({
    queryKey: ["promotionMasterData-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("promotion").select("*");
      if (error) throw error;
      return data;
    },
  });
  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      paymentDetails: formValues?.paymentDetails === "" ? null : formValues?.paymentDetails,
      nameOnTheCard: formValues?.nameOnTheCard === "" ? null : formValues?.nameOnTheCard,
      promotionId: formValues?.promotionId === "" ? null : formValues?.promotionId,
      amountActuallyPaidInCAD: formValues?.amountActuallyPaidInCAD === "" ? null : formValues?.amountActuallyPaidInCAD,
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
      <h1 className="H1">Add a new Payment By Payer record</h1>
      <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
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

        <Form.Input name="date" type="datetime-local" required />
        <Form.Input name="amountBeforeDiscountsInCAD" required />
        <Form.Input name="method" required />
        <Form.Input name="paymentDetails" />
        <Form.Input name="idInSheet" required />
        <Form.Input name="nameOnTheCard" />

        {renderNoData(promotionQ) ?? (
          <TypeHead
            name="promotionId"
            list="promotions"
            required={false}
            register={form.register}
            options={promotionQ.data.map((p) => {
              const value = p.id;
              const label = `name: ${p.name} | start date: ${toReadableDate(p.startDate)} | id: ${p.id}`;
              return [value, label];
            })}
          />
        )}

        <Form.Input name="amountActuallyPaidInCAD" />
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
