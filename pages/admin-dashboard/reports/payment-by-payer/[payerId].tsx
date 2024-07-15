import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { frmCAD } from "@/utils/formatter";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page = () => {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const router = useRouter();

  const { payerId } = router.query;

  const supabase = useSupabaseClient();
  const pQ = useQuery({
    queryKey: ["paymentByPayerReport"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(
          `
    *,
    payer (*, user(*)),
    promotion (*)
  `
        )
        .eq("payerId", payerId);
      if (error) throw error;
      return data;
    },
  });

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <p>All Payments paid by:</p>
      <p className="text-xl font-bold">
        {pQ.data.user.firstname} {pQ.data.user.lastname}
      </p>
      <>
        {renderNoData(pQ) ?? (
          <TableR pageId={pageId}>
            {pQ.data.map((payment) => {
              const row = {};
              (row["ID In Sheet"] = payment.idInSheet),
                (row["Date"] = payment.date),
                (row["Amount Before Discounts In CAD"] = frmCAD(payment.amountBeforeDiscountsInCAD)),
                (row["Amount Actually Paid In CAD"] = frmCAD(payment.amountActuallyPaidInCAD)),
                (row["Promotion ID"] = payment?.promotion?.IdInSheet);
              return row;
            })}
          </TableR>
        )}
      </>
    </div>
  );
};

export default Page;

// const priceWithPromotion = (p) => {

//   if (!p.promotion) return p.amountBeforeDiscountsInCAD;

//   if (p.promotion.constantAmountInCAD) return p.amountBeforeDiscountsInCAD - p.promotion.constantAmountInCAD;
//   if (p.promotion.percentage) return p.amountBeforeDiscountsInCAD * (1 - p.promotion.percentage);

//   return p.amountBeforeDiscountsInCAD;
// }

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);
  const { payerId } = ctx.params;
  await queryClient.prefetchQuery({
    queryKey: ["paymentByPayerReport"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(
          `
    *,
    payer (*, user(*)),
    promotion (*)
  `
        )
        .eq("payerId", payerId);
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
