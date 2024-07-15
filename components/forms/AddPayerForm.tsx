import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {  Form, useFormHook } from "@/components/FormComps";
import { useQueryClient } from "@tanstack/react-query";
import { getFullName } from "@/utils/formatter";

export default function AddPayerForm({ user, setRegisteredPayer }) {
  // const [registeredPayer, setRegisteredPayer] = useState(false);
  // change this:
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const schema = z.object({
    idInStudentSheet: z.string().min(3, "idInSheet is required"),
    /*     dashboardLink: z.string().optional().nullable(), */
    howLearnedAboutUs: z.string().optional().nullable(),
    secondPayerName: z.string().optional().nullable(),
  });

  const onSubmit = async (formValues) => {
    const payer = {
      id: user.id,
      payerEmail_dep: user.email,
      payerName_dep: user.firstname + " " + user.lastname,
      ...formValues,
    };
    const insertRes = await supabase.from("payer").insert(payer).select();
    if (insertRes.error)
      throw new Error(
        `'Could not insert the payer to the database. Please contact the developer! more details ${insertRes.error.message}`
      );
    setRegisteredPayer(insertRes.data[0]);
    queryClient.invalidateQueries({ queryKey: ["payers"] });
  };
  const form = useFormHook({ schema, onSubmit });

  return (
    <div className="space-y-2 ">
      <div className="space-y-2">
        <Form form={form} className="space-y-2" submitText="Add Payer Info">
          <Form.Input name="idInStudentSheet" required />
          {/*           <Form.Input name="dashboardLink" /> */}
          <Form.Input name="howLearnedAboutUs" />
          <Form.Input name="secondPayerName" />
        </Form>
      </div>
    </div>
  );
}
