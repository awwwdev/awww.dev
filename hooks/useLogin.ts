import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";
type argsTypes = {
  email: string;
  password: string;
};
const login = async ({ email, password }: argsTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export default function useLogin() {
  const queryClient = useQueryClient();
  const loginFunction = (args: argsTypes) => login(args);
  return useMutation(loginFunction, {
    onSuccess: async () => {
/*       console.log("in on success"); */

      queryClient.invalidateQueries({ queryKey: ["userMe"] });
/*       console.log("userMe invalidated"); */
    },
    onError: (err) => console.log("Login Error", err),
  });
}
