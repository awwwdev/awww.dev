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
  const teacherQ = useQuery({
    queryKey: ["teacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`*, user(*)`);
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
            href={`/admin-dashboard/master-data/teacher/${info.row.getValue("Teacher ID")}`}
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
        <Link href="/admin-dashboard/users/add-teacher" className="btn-prm bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(teacherQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            row["Teacher ID"] = teacher.id;
            row["Teacher ID in Sheet"] = teacher.idInSheet;
            row["Teacher Name"] = getFullName(teacher.user);
            row["English Fluency"] = teacher.englishFluency;
            row["Payment Details"] = teacher.paymentDetails;
            row["Profile Link"] = teacher.profileLink;
            row["Phone"] = String(teacher.user.phone);
            row["Email"] = teacher.user.email;
            row["Is Active"] = teacher.isActive;
            row["Payment Method"] = teacher.paymentMethod;
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
    queryKey: ["teacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`*, user(*)`);
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
