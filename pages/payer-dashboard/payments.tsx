import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { frmCAD } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const calcSessionCost = (se) => {
  const pkg = se.packagePurchased;
  let exp = pkg?.expertise ?? getLatestExpertise(se.packagePurchased?.expertise, se.course.topicId);
  let sessionCalculatedCost = null;
  let normalSessionCost = null;
  let durationFactor = null;
  let studentCountFactor = null;
  let sessionsCountFactor = null;
  let isHeldFactor = null;
  let sessionDurationOnWebsite = null;
  let requestedDuration = null;
  let studentsCount = null;
  let numberOfStudents = null;
  let numberOfSessions = null;
  const sessionsCountMap = {
    1: 1.15,
    10: 0.95,
    13: 0.95,
    15: 0.95,
    20: 0.95,
  };

  if (!exp) {
    sessionCalculatedCost = 0;
    normalSessionCost = 0;
    durationFactor = 0;
    studentCountFactor = 0;
    numberOfStudents = 0;
    sessionsCountFactor = 0;
    isHeldFactor = 0;
  } else {
    normalSessionCost = exp.sessionPriceInCAD ? exp.sessionPriceInCAD : null;
    sessionDurationOnWebsite = exp.sessionDurationOnWebsiteInMinute;
    requestedDuration = se.course.requestedSessionDurationInMinute;
    studentsCount = se.course.courseStudent.length;
    numberOfStudents = se.course.numberOfStudents;
    numberOfSessions = se.packagePurchased?.numberOfSessions ?? "no-package";
    sessionsCountFactor = sessionsCountMap[numberOfSessions] ?? 1;
    durationFactor = requestedDuration ? requestedDuration / sessionDurationOnWebsite : 1;
    studentCountFactor = ((studentsCount - 1) * 0.2 + 1) * (studentsCount / numberOfStudents);
    const isHeldMap = {
      YES: 1,
      NO: 0.5,
      CON: 0.5,
    };
    isHeldFactor = isHeldMap[se.isHeld];
    sessionCalculatedCost =
      sessionsCountFactor * durationFactor * studentCountFactor * isHeldFactor * normalSessionCost;
  }

  return sessionCalculatedCost;
};

const getLatestExpertise = (allExp, topicId) => {
  if (!allExp) return null;
  if (!topicId) return null;
  const matchedRecs = allExp.filter((ex) => {
    return ex.topicId === topicId;
  });

  if (matchedRecs.length === 0) return null;
  const latestExpertise = matchedRecs.reduce(
    (latest, exp) => (Date.parse(latest.startDate) > Date.parse(exp.startDate) ? latest : exp),
    matchedRecs[0]
  );
  if (!latestExpertise) return null;

  return latestExpertise;
};

const PayerDash = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const paymentQ = useQuery({
    queryKey: ["paymentByPayerPayerDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(
          `*,
    payer (*, user(*))`
        )
        .match({ payerId: userMeQ.data?.payer.id });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const sessionQ = useQuery({
    queryKey: ["sessionPayerPayerDash-1"],
    enabled: !!userMeQ.data?.payer.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `
      isHeld, id,
    course!inner  (
      id, requestedSessionDurationInMinute, topicId, topicId, numberOfStudents,
      courseStudent!inner (payerId, id)),
    packagePurchased ( 
      id , numberOfSessions , 
      expertise ( id,  sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId)
    )
    `
        )
        .filter("course.courseStudent.payerId", "eq", userMeQ.data?.payer.id);
      if (error) throw error;
      return data;
    },
  });

  let paymentsTotal = 0;
  if (paymentQ.data) {
    for (const payment of paymentQ.data) paymentsTotal += payment.amountBeforeDiscountsInCAD;
  }
  let sessionCosts = 0;
  if (sessionQ.data) {
    for (const se of sessionQ.data) sessionCosts += calcSessionCost(se);
  }

  const payment2Q = useQuery({
    queryKey: ["paymentByPayerPayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(
          `*,
      payer (*, user(*))`
        )
        .match({ payerId: userMeQ.data?.payer.id })
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  return (
    <>
      <h1 className="H1"> Payments </h1>
      <div className="space-y-2 p-4 rd-xl b-1 b-gray5 bg-gray2 c-sand11">
        <p>
          Total Payment: <span className="fw-700 "> {frmCAD(paymentsTotal)} </span>CAD
        </p>
        <p>
          Payments Spent: <span className="fw-700 "> {frmCAD(paymentsTotal)} </span>CAD
        </p>

        <p>
          Class Fees: <span className="fw-700 "> {frmCAD(sessionCosts)} </span>CAD
        </p>
        <p>
          Current Balance:{" "}
          <span className="fw-700 ">
            {" "}
            {paymentsTotal - sessionCosts > 0 ? 0 : frmCAD(paymentsTotal - sessionCosts)}{" "}
          </span>
          CAD
        </p>
      </div>
      <p className="info-line">
        You can limit the rows of the table through the search option at the top of each column
      </p>
      {renderNoData(userMeQ) ?? renderNoData(payment2Q) ?? (
        <TableR pageId={pageId}>
          {payment2Q.data.map((p, i) => {
            const row = {};
            row["Payer Name"] = p.nameOnTheCard;
            row["Date"] = new Date(p.date);
            row["Amount"] = p.amountActuallyPaidInCAD ?? "";
            row["Discount"] = p.amountBeforeDiscountsInCAD - p.amountActuallyPaidInCAD;
            return row;
          })}
        </TableR>
      )}
    </>
  );
};

export default PayerDash;

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();

  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["paymentByPayerPayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentByPayer")
        .select(
          `*,
      payer (*, user(*))`
        )
        .match({ payerId: session.user.id })
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
