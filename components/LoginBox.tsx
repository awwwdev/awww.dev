import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {  Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from './ui/Input';

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Please enter a your email" }),
  password: z.string({ required_error: "Password is required" }).min(1, { message: "Please type in your password" }),
});

export default function LoginBox() {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const onSubmit = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    toast.success("You are Logged in.");
    queryClient.invalidateQueries({ queryKey: ["userMe"] });

    const { data: logData, error: logError } = await supabase.from("dashboardVisitLog").insert({userId: data.user.id}).select();
    if (logError) {
      throw new Error(logError.message);
    }
    /*     console.log("🌟triggered userMe invalidation"); */
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  return (
    <div className="space-y-2  ">
      <div className="space-y-4">
        <Form form={form} className="space-y-4" submitText="LOGIN">
          <Form.Input name="email" label='Email' />
          <Form.Input label='Password' name="password" type={isPassVisible ? "text" : "password"} />
          <button type="button" onClick={() => setIsPassVisible((s) => !s)} className="btn-ghost flex ac gap-2">
            <span className={isPassVisible ? "i-ph-eye-closed" : "i-ph-eye"}></span>
            <span> Show Password</span>
          </button>
        </Form>
      
      </div>
    </div>
  );
}
