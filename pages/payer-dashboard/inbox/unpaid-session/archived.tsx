import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName, toReadableDate } from "@/utils/formatter";
import Link from "next/link";
import { toast } from "react-hot-toast";

const Archived = () => {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const queryClient = useQueryClient();

  const mailQ = useQuery({
    queryKey: ["unpaidSessionPayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unpaidSessionMailLog")
        .select(`*`)
        .filter("payerId", "eq", userMeQ.data?.payer.id)
        .eq("isArchived", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleArchive = async (mailId) => {
    const { data, error } = await supabase
      .from("unpaidSessionMailLog")
      .update({ isArchived: false })
      .eq("id", mailId);

    if (error) {
      toast.error("Error while marking message as unread");
    } else {
      toast.success("Message marked as unread successfully!");
      queryClient.invalidateQueries(["unpaidSessionPayerDash-2"]);
      queryClient.invalidateQueries(["unpaidSessionPayerDash-1"]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="H1">Read messages</h1>
        <Link href="/payer-dashboard/inbox/unpaid-session" className="btn-ghost-accent">
          <p className="bf-i-ph-arrow-left">Back to inbox</p>
        </Link>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(mailQ) ?? mailQ.data.length === 0 ? (
        <>There is no read message to show</>
      ) : (
        mailQ.data.map((mail) => (
          <details className="border border-gray-400 rounded-t-xl rounded-br-xl bg-gray-100" key={mail.id}>
            <summary className="flex justify-between p-4 cursor-pointer rounded-t-xl rounded-br-xl hover:bg-gray-300">
              <p className="inline text-sm">Unpaid Session</p>
              <p className="inline text-sm">{toReadableDate(mail.date)}</p>
            </summary>
            <div className="bg-white rounded-br-xl p-2">
              <div className="text-sm">
                <div dangerouslySetInnerHTML={{ __html: mail.emailBody }}></div>
              </div>
              <button className="btn-accent" onClick={() => handleArchive(mail.id)}>
                Mark as Unread
              </button>
            </div>
          </details>
        ))
      )}
    </>
  );
};

export default Archived;
