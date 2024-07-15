import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName, toReadableDate } from "@/utils/formatter";
import Link from "next/link";
import { toast } from "react-hot-toast";

const Inbox = () => {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const queryClient = useQueryClient();

  const mailQ = useQuery({
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

  const handleArchive = async (mailId) => {
    const { data, error } = await supabase.from("newIntroMeetingMailLog").update({ isArchived: true }).eq("id", mailId);

    if (error) {
      toast.error("Error while marking message as read");
    } else {
      toast.success("Message marked as read successfully!");
      queryClient.invalidateQueries(["mailMasterData-1"]);
    }
  };

  return (
    <>
      <h1 className="H1">Inbox</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Messages</h2>
        <Link href="/teacher-dashboard/inbox/archived" className="btn-ghost-prm">
          Read messages
        </Link>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(mailQ) ?? mailQ.data.length === 0 ? (
        <>There is no message to show</>
      ) : (
        mailQ.data.map((mail) => (
          <details className="border border-gray-400 rounded-t-xl rounded-br-xl bg-gray-100" key={mail.id}>
            <summary className="flex justify-between p-4 cursor-pointer rounded-t-xl rounded-br-xl hover:bg-gray-300">
              <p className="inline text-sm">New Introductory Meeting</p>
              <p className="inline text-sm">{toReadableDate(mail.date)}</p>
            </summary>
            <div className="bg-white rounded-br-xl p-2">
              <p dir="rtl" className="text-right text-sm">
                <span dangerouslySetInnerHTML={{ __html: mail.emailBody }}></span>
              </p>
              <button className="btn-prm" onClick={() => handleArchive(mail.id)}>
                Mark as Read
              </button>
            </div>
          </details>
        ))
      )}
    </>
  );
};

export default Inbox;
