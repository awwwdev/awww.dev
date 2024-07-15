// useMailQuery.js
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";

export default function useNewIntroMeetingMail() {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const newIntroMeetingMailQ = useQuery({
    queryKey: ["mailMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newIntroMeetingMailLog")
        .select(`*, course!inner(teacherId)`)
        .filter("course.teacherId", "eq", userMeQ.data?.teacher.id)
        .eq("isArchived", false)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.teacher.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return newIntroMeetingMailQ;
}
