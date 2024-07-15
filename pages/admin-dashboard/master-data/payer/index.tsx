import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const payerQ = useQuery({
    queryKey: ["payerMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payer").select(`*, student (*, user(*)), user (*)`);
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
            href={`/admin-dashboard/master-data/payer/${info.row.getValue("Payer ID")}`}
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
        <Link href="/admin-dashboard/users/add-payer" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(payerQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {payerQ.data.map((payer) => {
            const row = {};
            row["Payer ID"] = payer.id;
            row["Payer ID In Student Sheet"] = payer.idInStudentSheet;
            row["Payer ID"] = String(payer.id);
            row["Payer Name"] = getFullName(payer.user);
            row["Email"] = payer.user.email;
            row["Students"] = payer.student.map((s) => getFullName(s.user)).join(", ");
            row["Number Of Students"] = payer.student.length ?? "";
            row["Second Payer Name"] = payer.secondPayerName;
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
    queryKey: ["payerMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payer").select(`*, student (*, user(*)), user (*)`);
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
