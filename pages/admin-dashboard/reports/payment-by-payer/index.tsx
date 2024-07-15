import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetR from "@/hooks/useGetR";
import { useMonths } from "@/components/MonthsProvider";
import { frmCAD, getFullName } from "@/utils/formatter";
import { useMemo } from "react";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page = () => {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const payerQ = useGetR("payer", `user(id, firstname , lastname)`);
  const paymentQ = useGetR("paymentByPayer", `amountBeforeDiscountsInCAD, date, payerId , promotion (*)`);
  const months = useMonths();

  const computeMonthsWithPayments = () => {
    if (!paymentQ.data) return null;
    const res = months.map((m) => {
      const payments = paymentQ.data.filter((p) => m.includes(p?.date));
      return { ...m, payments };
    });
    return res;
  };
  const monthWithPayments = useMemo(computeMonthsWithPayments, [paymentQ.data, months]);

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <h1 className="H1">Payments By Payers</h1>
      <>
        {renderNoData(paymentQ) ?? renderNoData(payerQ) ?? (
          <TableR pageId={pageId}>
            {payerQ.data.map((payer) => {
              const allPayment = paymentQ.data.filter((p) => p.payerId === payer.user.id);
              let allPaymentCost = 0;
              for (const p of allPayment) allPaymentCost += priceWithPromotion(p);

              const row = {};
              (row["Payer Name"] = getFullName(payer.user)), (row["All Payment Cost In CAD"] = frmCAD(allPaymentCost));

              for (const month of monthWithPayments) {
                const allPaymentMonth = month.payments.filter((p) => p.payerId === payer.user.id);
                let allPaymentMonthCost = 0;
                for (const p of allPaymentMonth) allPaymentMonthCost += priceWithPromotion(p);
                row[month.yearMonth] = frmCAD(allPaymentMonthCost);
              }
              return row;
            })}
          </TableR>
        )}
      </>
    </div>
  );
};

export default Page;

const priceWithPromotion = (payment) => {
  if (!payment.promotion) return payment.amountBeforeDiscountsInCAD;

  if (payment.promotion.constantAmountInCAD)
    return payment.amountBeforeDiscountsInCAD - payment.promotion.constantAmountInCAD;
  if (payment.promotion.percentage) return payment.amountBeforeDiscountsInCAD * (1 - payment.promotion.percentage);

  return payment.amountBeforeDiscountsInCAD;
};
