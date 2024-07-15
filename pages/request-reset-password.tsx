import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ErrMsg, Form, Input, useFormHook } from "@/components/FormComps";
import { SITE_URL } from "@/constants";

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || constants.siteURL;

const schema = z.object({
  email: z.string().min(2, "Please type your email address here.").email("Please provide a valid email address."),
});
const Page: NextPage = () => {
  const onSubmit = async ({ email }) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/account/change-password`,
    });
    if (error) throw error;
  };
  const form = useFormHook({ schema, onSubmit });
  const supabase = useSupabaseClient();

  return (
    <div className="h-full flex flex-col jc ac gap-8 w-80">
      <div className="space-y-8 w-80">
        <h1 className="H1">Reset Password</h1>
        <Form form={form} className="space-y-6" submitText="SUBMIT">
          <Form.Input type="text" name="email" label="Your Email" placeholder="john@example.com" />
          <ErrMsg name="root.submit" />
        </Form>
        {form.formState.isSubmitSuccessful && (
          <p className="snack-success">
            We sent instruction to reset password to your email. If you don’t see it in your inbox, please check your
            spam or junk folder, too.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
