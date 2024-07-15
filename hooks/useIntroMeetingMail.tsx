// useMailQuery.js
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";

export default function useIntroMeetingMail() {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const mailQ = useQuery({
    queryKey: ["introMeetingPayerDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("introMeetingMailLog")
        .select(`*, course!inner(payerId)`)
        .filter("course.payerId", "eq", userMeQ.data?.payer.id)
        .eq("isArchived", false)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return mailQ;
}
