import { Database } from "@/supabase/db_types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import supabase from "../utils/supabase";

export default function useGetUserMe() {
  type UserMe = User & { admin?: Admin; payer?: Payer; teacher?: Teacher; student?: Student } & {
    isAdmin?: boolean;
    isTeacher?: boolean;
    isPayer?: boolean;
    isStudent?: boolean;
  };
  const supabase = useSupabaseClient();
  // const user = useUser(); // couldn't use the hooky way. so instead I used the old getSupabaseAuthUser
  return useQuery<UserMe, Error>({
    queryKey: ["userMe"],
    onError: (err: Error) => console.log("Error happened fetching userMe:", err),
    // onSuccess: () => {
    //   console.log("userMe ran successfully");
    // },
    queryFn: async () => {
      const user = await getSupabaseAuthUser(supabase);
      if (!user) return null;
      const { data, error } = await supabase
        .from("user")
        .select(
          `*,
    payer (*) ,
    teacher (*),
    admin (*),
    student (*)
    `
        )
        .eq("id", user?.id)
        .single();

      if (error) throw error;

      let res = { ...data };
      // virtual properties
      if (res?.admin?.length || res?.admin?.id) res["isAdmin"] = true;
      if (res?.teacher?.length || res?.teacher?.id) res["isTeacher"] = true;
      if (res?.payer?.length || res?.payer?.id) res["isPayer"] = true;
      if (res?.student?.length || res?.student?.id) res["isStudent"] = true;

      return res;
    },
  });
}

export const getSupabaseAuthUser = async (supabase) => {
  const sessionRes = await supabase.auth.getSession();
  if (!sessionRes) return null;
  if (sessionRes.error) throw new Error(sessionRes.error.message);
  if (!sessionRes?.data?.session) return null;
  const userAuthMe = sessionRes?.data?.session?.user;
  return userAuthMe;
};

// const getUserMe = async () => {
//   const userAuthMe = await getSupabaseAuthUser();
//   if (!userAuthMe) return null;
//   const { data, error } = await supabase
//     .from("user")
//     .select(
//       `*,
//     payer (*) ,
//     teacher (*),
//     admin (*),
//     student (*)
//     `
//     )
//     .eq("id", userAuthMe?.id)
//     .single();

//   if (error) throw error;

//   let res = { ...data };
//   // virtual properties
//   if (res?.admin?.length || res?.admin?.id) res["isAdmin"] = true;
//   if (res?.teacher?.length || res?.teacher?.id) res["isTeacher"] = true;
//   if (res?.payer?.length || res?.payer?.id) res["isPayer"] = true;
//   if (res?.student?.length || res?.student?.id) res["isStudent"] = true;

//   // console.log("🚀 ~ res", res)
//   console.log("🚀 ~ res:", res);
//   return res;
// };
