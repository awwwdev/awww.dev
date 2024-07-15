import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase/db_types";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient<Database>();
  const expertiseQ = useQuery({
    queryKey: ["expertiseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expertise")
        .select(`*, topic (*), teacher (*, user(*))`)
        .order("startDate", { ascending: false });
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
            href={`/admin-dashboard/master-data/expertise/${info.row.getValue("Expertise ID")}`}
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
        <Link href="/admin-dashboard/master-data/expertise/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(expertiseQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {expertiseQ.data.map((expertise) => {
            const row = {};
            row["Expertise ID"] = expertise.id;
            row["Expertise ID in Sheet"] = expertise.idInSheet;
            row["Teacher Name"] = getFullName(expertise.teacher.user);
            row["Topic ID"] = String(expertise.topicId);
            row["Topic Name"] = expertise.topic.name;
            row["Category"] = expertise.topic.category;
            row["Session Price In CAD"] = expertise.sessionPriceInCAD ?? "";
            row["session Duration On Website In Minute"] = expertise.sessionPriceInCAD ?? "";
            row["Start Date"] = new Date(expertise.startDate);
            row["End Date"] = new Date(expertise.endDate);
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
    queryKey: ["expertiseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expertise")
        .select(`*, topic (*), teacher (*, user(*))`)
        .order("startDate", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
} */
