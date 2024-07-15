import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { ColumnDef } from "@tanstack/table-core";
import Icon from "@/components/ui/Icon";

import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const currencyQ = useQuery({
    queryKey: ["currencyExchangeRateMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("currencyExchangeRate")
        .select(`*`)
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
            href={`/admin-dashboard/master-data/currency-exchange-rate/${info.row.getValue(
              "Currency Exchange Rate ID"
            )}`}
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
        <Link href="/admin-dashboard/master-data/currency-exchange-rate/add" className="btn-prm bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(currencyQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {currencyQ.data.map((currency) => {
            const row = {};
            row["Currency Exchange Rate ID"] = currency.id;
            row["Currency Exchange Rate ID in Sheet"] = currency.idInSheet;
            row["Darsoon Month"] = currency.monthInSheet;
            row["Start Date"] = new Date(currency.startDate);
            row["End Date"] = new Date(currency.endDate);
            row["CAD to IRR Rate"] = currency.CADtoIRR ?? "";
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
    queryKey: ["currencyExchangeRateMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("currencyExchangeRate")
        .select(`*`)
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
