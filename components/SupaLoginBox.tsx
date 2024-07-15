import type { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const SupaLoginBox = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />;
};

export default SupaLoginBox;
