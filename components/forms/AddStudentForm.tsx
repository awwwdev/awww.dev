import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetPayers from "@/hooks/useGetPayers";
import {  Form, useFormHook } from "@/components/FormComps";
import { useQueryClient } from "@tanstack/react-query";
import { getFullName } from "@/utils/formatter";
import { DevTool } from "@hookform/devtools";
export default function AddStudentForm({ user, payerUser, setRegisteredStudent }) {
  // const [registeredStudent, setRegisteredStudent] = useState(false);
  // change this:
  const currentTear = new Date().getFullYear();
  const schema = z.object({
    yearOfBirth: z
      .string()
      .refine((v) => v === "" || (v.length === 4 && !isNaN(Number(v)) && Number(v) > 1910 && Number(v) < currentTear), {
        message: `Please write a year between 1910 to ${currentTear} or leave it blank`,
      })
      .transform((v) => (v === "" ? null : Number(v))),
    dateJoined: z.string().min(1, "Please fill the date student joined Darsoon"),
    idInSheet: z.string().optional().nullable(),
  });

  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const onSubmit = async (formValues) => {
    const student = {
      id: user.id,
      payerId: payerUser.id,
      studentName_dep: user.firstname + " " + user.lastname,
      studentEmail_dep: formValues.idInSheet + "-student@darsoon.com",
      studentPayerName_dep: payerUser.payerName_dep,
      studentPayerEmail_dep: payerUser.payerEmail_dep,
      ...formValues,
    };
    const { data, error } = await supabase.from("student").insert(student).select();
    if (error) {
      throw new Error(
        "Could not insert the student to the database. Please contact the developer! | Error details: " + error.message
      );
    }

    setRegisteredStudent(data[0]);
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const payerQ = useGetPayers();
  const form = useFormHook({ schema, onSubmit });

  return (
    <div className="space-y-2 b-1  b-solid rd-lg p-4">
      <h2 className="">Now add the student info</h2>
      <div className="space-y-2">
        <Form form={form} className="space-y-2" submitText="Add Student Info">
          <label>
            <input type="text" />
            <datalist>
              <option></option>
            </datalist>
          </label>
          <Form.Input name="idInSheet" />
          <Form.Input name="yearOfBirth" placeholder="ex. 2006" />
          <Form.Input name="dateJoined" type="date" required />
        </Form>
      </div>
      {/* <DevTool control={form.control} /> */}
    </div>
  );
}
