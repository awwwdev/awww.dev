import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const studentQ = useQuery({
    queryKey: ["studentMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(`*, payer (* , user(*)), user (*)`)
        .order("dateJoined", { ascending: false });
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
            href={`/admin-dashboard/master-data/student/${info.row.getValue("Student ID")}`}
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
        <Link href="/admin-dashboard/users/add-student" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(studentQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {studentQ.data.map((student) => {
            const row = {};
            row["Student ID"] = student.id;
            row["Student ID in Sheet"] = student.idInSheet;
            row["Student Name"] = getFullName(student.user);
            row["Student Name In Farsi"] = getFullNameFa(student.user);
            row["Year Of Birth"] = student.yearOfBirth ?? "";
            row["Date Joined"] = new Date(student.dateJoined);
            row["Payer ID"] = String(student.payerId);
            row["Payer Name"] = getFullName(student.payer.user);
            row["Second Payer Name"] = student.payer.secondPayerName;
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
    queryKey: ["studentMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(`*, payer (* , user(*)), user (*)`)
        .order("dateJoined", { ascending: false });
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
