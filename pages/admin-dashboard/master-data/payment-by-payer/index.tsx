import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
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
  const paymentPQ = useQuery({
    queryKey: ["paymentByPayerMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(`*, promotion (*), payer(*, user(*))`)
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
            href={`/admin-dashboard/master-data/payment-by-payer/${info.row.getValue("Payment By Payer ID")}`}
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
        <Link href="/admin-dashboard/master-data/payment-by-payer/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(paymentPQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {paymentPQ.data.map((payment) => {
            const row = {};
            row["Payment By Payer ID"] = payment.id;
            row["Payment By Payer ID in Sheet"] = payment.idInSheet;
            row["Payer ID"] = String(payment.payerId);
            row["Payer Name"] = getFullName(payment.payer.user);
            row["Name On The Card"] = payment.nameOnTheCard;
            row["Date"] = new Date(payment.date);
            row["Amount Before Discounts In CAD"] = payment.amountBeforeDiscountsInCAD ?? "";
            row["Amount Actually Paid In CAD"] = payment.amountActuallyPaidInCAD ?? "";
            row["Method"] = payment.method;
            row["Payment Details"] = payment.paymentDetails;
            row["Promotion ID"] = String(payment.promotionId);
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
    queryKey: ["paymentByPayerMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(`*, promotion (*), payer(*, user(*))`)
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
}
 */
