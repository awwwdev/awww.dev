import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const topicQ = useQuery({
    queryKey: ["topicMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select(`*`);
      if (error) throw error;
      return data;
    },
  });

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Edit Records",
      header: "Edit Records",
      cell: (info) => {
        return info.getValue ? (
          <Link
            href={`/admin-dashboard/master-data/topic/${info.row.getValue("Topic ID")}`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Edit
          </Link>
        ) : null;
      },
    },
  ];

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <div className="rd-xl b-1 b-gray-6 bg-gray1 p-4 flex justify-end">
        <Link href="/admin-dashboard/master-data/topic/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(topicQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {topicQ.data.map((topic) => {
            const row = {};
            row["Topic ID"] = topic.id;
            row["Topic ID in Sheet"] = topic.idInSheet;
            row["Topic name"] = topic.name;
            row["Category"] = topic.category;
            row["Edit Records"] = "";

            return row;
          })}
        </TableR>
      )}
    </div>
  );
};

export default AdminDash;

/* export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  await queryClient.prefetchQuery({
    queryKey: ["topicMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select("*");
      if (error) throw error;
      return data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
 */
