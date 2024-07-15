// useMailQuery.js
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";

export default function useSessionInTeacherInbox() {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const sessionInTeacherInboxQ = useQuery({
    queryKey: ["sessionTeacherDash-33"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(`*, course!inner(id, teacherId, courseStudent(student(user(*))))`)
        .filter("course.teacherId", "eq", userMeQ.data?.teacher.id)
        .not("isActionDoneByTeacher", "is", true)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.teacher.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return sessionInTeacherInboxQ;
}
