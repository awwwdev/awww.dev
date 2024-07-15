import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";

export const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter user's Email")
    .min(5, "Email must be 5 characters or longer")
    .email({ message: "Please enter a valid email." }),
  firstname: z.string().min(1, "Please enter user's first name"),
  lastname: z.string().min(1, "Please enter user's lastname"),
  firstnameFa: z.string().min(1, "Please enter users Farsi firstname"),
  lastnameFa: z.string().min(1, "Please enter users Farsi lastname"),
  countryCode: z.string().max(2, { message: "Must be 2 or fewer characters long" }).optional().nullable(),
  phoneCountryCode: z
    .string()
    .regex(/^(\s*|\d+)$/)
    .max(4, { message: "Must be 4 or fewer digits" }) //
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^(\s*|\d+)$/)
    .optional()
    .nullable(),
});

export default function AddUserForm({ registeredUser, setRegisteredUser, userType = null }) {
  const [isStudentUser, setIsStudentUser] = useState(false);
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      name_dep: formValues.firstname + ' ' + formValues.lastname,
      nameFa_dep: formValues.firstnameFa + ' ' + formValues.lastnameFa
    }
    const body = JSON.stringify(correctFormValues);

    const res = await fetch("/api/create-user", {
      method: "POST",
      body,
    });

    const { data, error } = await res.json();
    if (error?.message === "JSON.parse: unexpected character at line 1 column 1 of the JSON data") {
      throw new Error("Something went wrong in the server. Please contact the developers");
    }
    if (error) {
      throw error;
    }
    // if (error?.message === "Email address already registered by another user") {
    //   // const { data, error } = await supabaseAdmin.from("user").admin.createUser({ email, password });
    // }

    // if (updateError) {
    //   throw new Error(`Could not register user. Please try again. (More Detail: ${updateError?.message})`);
    // }

    queryClient.invalidateQueries({ queryKey: ["users"] });
    setRegisteredUser(data[0]);
  };
  const form = useFormHook({ schema, onSubmit });

  if (registeredUser) return <p className="snack-success">User is successfully created</p>;

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Add User">
      <div className="snack-info">
        <p>
          A Password will be automatically created for this user.
          <br />
          The user needs to request a password change the first time that wants to login
        </p>
      </div>
      {!userType && (
        <label className="flex gap-2">
          <input type="checkbox" checked={isStudentUser} onChange={(e) => setIsStudentUser(e.target.checked)} />
          This user is for a new student
        </label>
      )}
      {(userType === "student" || isStudentUser) && (
        <div>
          <label className="space-y-1">
            <p className="c-sand11 fw-500">
              <span>Email </span>
              <span className="c-red11">*</span>
            </p>
            <p className="info-line">Please complete the blank area with Student ID from Google Sheet </p>
            <p className="!mt-2 flex gap-1 c-sand11">
              <input
                className="field block"
                pattern="(std|Std)(\d+)"
                name="email"
                placeholder="Std0000"
                size={8}
                onChange={(e) => form.setValue("email", `${e.target.value.toLowerCase()}-student@darsoon.com`)}
                required
              />
              -student@darsoon.com
            </p>
            <ErrMsg name="email" />
          </label>
        </div>
      )}
      {(["teacher", "payer", "admin"].includes(userType) || (!userType && !isStudentUser)) && (
        <Form.Input name="email" required />
      )}
      <Form.Input name="firstname" required />
      <Form.Input name="lastname" required />
      <Form.Input name="firstnameFa" required />
      <Form.Input name="lastnameFa" required />
      {!(userType === "student" || isStudentUser) && (
        <>
          <Form.Input name="countryCode" />
          <Form.Input name="phoneCountryCode" />
          <Form.Input name="phone" />
        </>
      )}
    </Form>
  );
}
