import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "./ui/Input";
import Tabs from "./ui/Tabs";
import SignUpBox from "./SignUpBox";
import LoginBox from "./LoginBox";
import Button from './ui/button';

export default function LoginOrSignUpBox() {
  const [tabVelue, setTabValue] = useState<"login" | "signup">("signup");
  return (
    <div className="space-y-2  b-solid rd-lg p-4 w-full ">
      <div className="space-y-4">
        <Tabs value={tabVelue} onValueChange={(v: "login" | "signup") => setTabValue(v)}>
          <Tabs.TabsList>
            <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
          </Tabs.TabsList>
          <Tabs.Content value="signup">
            <SignUpBox />
            <p className="mt-8 text-sm c-sand11 text-center">Already a user?{` `}

              <Button variation='text' preStyled={false} onClick={() => setTabValue('login')}> Login here</Button>
            </p>
          </Tabs.Content>
          <Tabs.Content value="login">
            <LoginBox />
            <p className="mt-8 text-xs c-sand11 text-center">
              Forgot Password? <Link href="/request-reset-password">Reset it here.</Link>
            </p>
            <p className="mt-8 text-xs c-sand11 text-center">No Account?
              <Button variation='text' preStyled  onClick={() => setTabValue('signup')}> Sign Up here.</Button>
            </p>
          </Tabs.Content>
        </Tabs>
        <div></div>
      </div>
    </div>
  );
}
