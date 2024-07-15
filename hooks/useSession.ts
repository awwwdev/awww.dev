import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const useSession = () => {
  let [session, setSession] = useState(null);
  const supabase = useSupabaseClient();
  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  return session;
};

export default useSession;
