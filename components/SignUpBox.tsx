import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Fieldset from './ui/Fieldset';

const schema = z.object({
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
    .max(4, { message: "Must be 4 or fewer digits" })
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^(\s*|\d+)$/)
    .optional()
    .nullable(),
  password: z.string().min(8, "Password must be 8 characters or longer"),
});

export default function SignUpBox() {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const [signedUp, setSignedUp] = useState(false);

  const onSubmit = async (formValues) => {
    const correctFormValues = {
      ...formValues,
      name_dep: formValues.firstname + " " + formValues.lastname,
      nameFa_dep: formValues.firstnameFa + " " + formValues.lastnameFa,
    };
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: correctFormValues.email,
      password: correctFormValues.password,
      options: {
        emailRedirectTo: window.location.href,
      },
    });
    if (signUpError) {
      throw signUpError;
    }
    if (user) {
      const { password, ...otherFormValues } = correctFormValues;
      const { data, error: updateError } = await supabase
        .from("user")
        .update({
          ...otherFormValues,
        })
        .eq("id", user.user.id);

      if (updateError) {
        throw updateError;
      }

      const { data: payerData, error: insertError } = await supabase.from("payer").insert({
        id: user.user.id,
      });

      if (insertError) {
        throw insertError;
      }
      setSignedUp(true);
    }
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  if (signedUp) {
    return <p>You signed up successfully. Please check your email and confirm it.</p>;
  }
  return (
    <div className="space-y-2">
      <div className="space-y-4">
        <Form form={form} onSubmit={onSubmit} className="" submitText="Sign Up" hasSubmitButton={false}>
          <Form.Input name="firstname" required />
          <Form.Input name="lastname" required />
          <Form.Input name="firstnameFa" required />
          <Form.Input name="lastnameFa" required />
          <Form.Input name="email" required />
          {/* <Form.Input name="countryCode" /> */}
          <Fieldset name='phonenumber' legend='Phone Number'>

          <div className="flex gap-3">
            <Form.Input label='Country Code' name="phoneCountryCode" size={4} />
            <div className="grow">
              <Form.Input name="phone" />
            </div>
          </div>
          </Fieldset>
          <Form.Input name="password" type={isPassVisible ? "text" : "password"} required />

          <Form.ServerErrorMessage />
          <Form.SubmitButton width='parent'>Submit</Form.SubmitButton>
        </Form>
      </div>
    </div>
  );
}
