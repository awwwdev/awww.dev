import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName, toReadableDate } from "@/utils/formatter";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { NavLink } from '@/components/layouts/Lnk';

const Inbox = () => {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const queryClient = useQueryClient();

  const mailQ = useQuery({
    queryKey: ["unpaidSessionPayerDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("unpaidSessionMailLog")
        .select(`*`)
        .filter("payerId", "eq", userMeQ.data?.payer.id)
        .eq("isArchived", false)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleArchive = async (mailId) => {
    const { data, error } = await supabase.from("unpaidSessionMailLog").update({ isArchived: true }).eq("id", mailId);

    if (error) {
      toast.error("Error while marking message as read");
    } else {
      toast.success("Message marked as read successfully!");
      queryClient.invalidateQueries(["unpaidSessionPayerDash-1"]);
    }
  };

  return (
    <>
      <h1 className="H1">Inbox</h1>
      <nav aria-label="by teacher reports" className="flex gap-2 flex-wrap text-xs border-t py-4">
        <NavLink baseHref="/payer-dashboard/inbox" page="intro-meeting" />
        <NavLink baseHref="/payer-dashboard/inbox" page="unpaid-session" />
        <NavLink baseHref="/payer-dashboard/inbox" page="end-of-package" />
      </nav>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Messages</h2>
        <Link href="/payer-dashboard/inbox/unpaid-session/archived" className="btn-ghost-accent">
          Read messages
        </Link>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(mailQ) ?? mailQ.data.length === 0 ? (
        <>There is no message to show</>
      ) : (
        mailQ.data.map((mail) => {
          return (
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
                  Mark as Read
                </button>
              </div>
            </details>
          );
        })
      )}
    </>
  );
};

export default Inbox;
