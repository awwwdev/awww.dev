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
  const giftTQ = useQuery({
    queryKey: ["giftForTeacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("giftForTeacher")
        .select(`*, payer(*, user(*)), teacher(*, user(*))`)
        .order("date", { ascending: false });
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
            href={`/admin-dashboard/master-data/gift-for-teacher/${info.row.getValue("Gift For Teacher ID")}`}
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
        <Link href="/admin-dashboard/master-data/gift-for-teacher/add" className="btn-prm bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(giftTQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {giftTQ.data.map((gift) => {
            const row = {};
            row["Gift For Teacher ID"] = gift.id;
            row["Gift For Teacher ID in Sheet"] = gift.idInSheet;
            row["Date"] = new Date(gift.date);
            row["Amount In CAD"] = gift.amountInCAD ?? "";
            row["From"] = gift.payerId ? getFullName(gift.payer.user) : "Darsoon";
            row["Teacher Id"] = String(gift.teacherId);
            row["Teacher Name"] = getFullName(gift.teacher.user);
            row["Reason"] = gift.reason;
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
    queryKey: ["giftForTeacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("giftForTeacher")
        .select(`*, payer(*, user(*)), teacher(*, user(*))`)
        .order("date", { ascending: false });
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
