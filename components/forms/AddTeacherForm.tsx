import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Form, Input, useFormHook } from "@/components/FormComps";
import { useQueryClient } from "@tanstack/react-query";
import { getFullName } from "@/utils/formatter";
import { ErrorMessage } from "@hookform/error-message";
export default function AddTeacherForm({ user, setRegisteredTeacher }) {
  // const [registeredTeacher, setRegisteredTeacher] = useState(false);

  const schema = z.object({
    englishFluency: z.enum(["Beginner", "Intermediate", "Advanced", "Fluent"]),
    profileLink: z.string().optional().nullable(),
    idInSheet: z
      .string()
      .min(1, "Please fill in ID in Sheet.")
      .min(2, "ID in Sheet must be at least 2 characters long"),
    isActive: z.boolean({ required_error: "Please choose if the teacher is active or not" }),
    paymentDetails: z.string().optional().nullable(),
    paymentMethod: z.string().optional().nullable(),
  });
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const onSubmit = async (formValues) => {
    // alert("in submit")
    const teacher = {
      id: user.id,
      teacherEmail_dep: user.email,
      teacherName_dep: user.firstname + ' ' + user.lastname,
      ...formValues,
    };
    const { data, error } = await supabase.from("teacher").insert(teacher).select();
    if (error)
      throw new Error(
        `Could not insert the teacher to the database. Please contact the developer! | Error details: ${error.message} `
      );
    queryClient.invalidateQueries({ queryKey: ["teachers"] });
    setRegisteredTeacher(data[0]);
  };
  const form = useFormHook({ schema, onSubmit });

  return (
    <div className="space-y-6">
      <p className="info-line">Now PLease fill in information bellow</p>
      <div className="space-y-2">
        <Form form={form} submitText="Add Teacher Info" className="space-y-2">
          <label className="block">
            English Fluency
            <select {...form.register("englishFluency")} className="field py-1 block min-w-40 max-w-80 w-full">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Good">Good</option>
              <option value="Fluent">Fluent</option>
            </select>
          </label>
          <Form.Input name="paymentDetails" />
          <Form.Input name="profileLink" />
          <Form.Input name="idInSheet" required />
          <Form.Input name="paymentMethod" />
          <Form.Input name="isActive" label="Teacher is currently active" type="checkbox" defaultChecked />
        </Form>
      </div>
    </div>
  );
}
