import { NextPage } from "next";
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Form, ErrMsg, InputEl, useFormHook, Input } from "@/components/FormComps";
import { useState } from "react";
import Link from "next/link";
import Icon from '@/components/ui/Icon';

const schema = z.object({
  password: z
    .string()
    .min(8, "min")
    .max(64, "max")
    .regex(/[A-Z]/, "uppercase")
    .regex(/[a-z]/, "lowercase")
    .regex(/\d/, "digit"),
  /*     .regex(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/, 'special'), */
  confirmPassword: z.string().min(1, "Please fill in the confirm password"),
});

const Page: NextPage = () => {
  const supabase = useSupabaseClient();
  const onSubmit = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      throw new Error("Passwords must match. Try again.");
    }
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  const form = useFormHook({ schema, onSubmit, mode: "onChange" });

  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="h-full">
      <h1 className="H1 mb-8">Change Password</h1>
      <Form form={form} className="space-y-8 w-80" submitText="Change Password">
        <button className={`btn flex gap- ac `} onClick={() => setIsPassVisible((s) => !s)}>
          <span className={isPassVisible ? "i-ph-eye" : "i-ph-eye-closed"} />
          {isPassVisible ? "Hide password" : "Show password"}
        </button>
       <Form.Input
          label="New Password"
          name="password"
          type={isPassVisible ? "text" : "password"}
          hasErrorMessage={false}
        />
        <PasswordValidation form={form} />
       <Form.Input
          name="confirmPassword"
          label="Confirm Password"
          type={isPassVisible ? "text" : "password"}
          // hasErrorMessage={false}
        />
      </Form>
      {form.formState.isSubmitSuccessful && (
        <div className="space-y-2">
          <p role="alert" className="snack-success">
            Your password is successfully updated.
          </p>
          <Link href="/">Go back to your home</Link>
        </div>
      )}
    </div>
  );
};

export default Page;

const PasswordValidation = ({ form }) => {
  const isSubmitted = form.formState.isSubmitted;
  const isPassDirty = form.formState.dirtyFields?.password;
  const errMsg = form.formState?.errors?.password?.message;

  const errorColor = isSubmitted ? "c-red11" : "c-sand11";
  const errorIcon = "bf-i-ph-circle";
  const correctIcon = "bf-i-ph-circle";

  return (
    <div className="my-4">
      {/* <p>isSubmitted: {isSubmitted ? 'true' : 'false'}</p>
      <p>isPassDirty: {isPassDirty ? 'true' : 'false'}</p>
      <p>errMsg: &quot;{errMsg}&quot;</p> */}
      <span>
      <Icon name="bf-i-ph-info italic" />
      Your Password must have at least</span>
      <p
        className={`${errorColor} ${errorIcon}   ${
          isPassDirty && errMsg !== "min" && "c-green11 bf-i-ph-check-circle"
        }`}
      >
        8 characters
      </p>
      <p
        className={`${errorColor} ${errorIcon} 
          ${isPassDirty && errMsg !== "uppercase" && "c-green11 bf-i-ph-check-circle"}`}
      >
        one UPPERCASE character
      </p>
      <p
        className={`${errorColor} ${errorIcon}   ${
          isPassDirty && errMsg !== "lowercase" && "c-green11 bf-i-ph-check-circle"
        }`}
      >
        one lowercase character
      </p>
      <p
        className={`${errorColor} ${errorIcon}  ${
          isPassDirty && errMsg !== "digit" && "c-green11 bf-i-ph-check-circle"
        }`}
      >
        one digit (1234567890) character
      </p>
      {/*         <p
          className={`${errorColor} ${errorIcon} ${
            isPassDirty && errMsg !== 'special' && 'c-green11 bf-i-ph-check-circle'
          }`}
        >
          one special character{' '}
          <span className='text-sm px-1  bg-gray3 rd-xs '>{`! @ # $ % ^ & * ( ) _ + \ - = { } ; ' : " | , . < > ? ~ `}</span>
        </p> */}
    </div>
  );
};
