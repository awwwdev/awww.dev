import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const paymentTQ = useQuery({
    queryKey: ["paymentToTeacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentToTeacher")
        .select(`*, teacher(*, user(*)), currencyExchangeRate(*)`)
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
            href={`/admin-dashboard/master-data/payment-to-teacher/${info.row.getValue("Payment To Teacher ID")}`}
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
        <Link href="/admin-dashboard/master-data/payment-to-teacher/add" className="btn-prm bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(paymentTQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {paymentTQ.data.map((payment) => {
            const row = {};
            row["Payment To Teacher ID"] = payment.id;
            row["Payment To Teacher ID in Sheet"] = payment.idInSheet;
            row["Teacher ID"] = String(payment.teacherId);
            row["Teacher Name"] = getFullName(payment.teacher.user);
            row["Date"] = new Date(payment.date);
            row["Payment Amount In CAD"] = payment.totalAmountInCAD ?? "";
            row["Correction Amount In CAD"] = payment.correctionAmountInCAD ?? "";
            row["Amount Paid In CAD"] = payment.amountPayedInCAD ?? "";
            row["Amount Paid In IRR"] = payment.amountPayedInIRR ?? "";
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
    queryKey: ["paymentToTeacherMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentToTeacher")
        .select(`*, teacher(*, user(*)), currencyExchangeRate(*)`)
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
