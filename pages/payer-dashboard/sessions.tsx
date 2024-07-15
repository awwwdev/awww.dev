import { useState } from "react";
import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName, toReadableDate } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const PayerDash = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const sessionQ = useQuery({
    queryKey: ["sessionPayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `*, 
          course!inner (*, courseStudent!inner(payerId, payer(*, user(*)), student(user(*))), teacher(user(*)), topic(*)), packagePurchased(*)`
        )
        .filter("course.courseStudent.payerId", "eq", userMeQ.data?.payer.id)
        .filter("isHeld", "neq", "CON")
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const [filterDuration, setFilterDuration] = useState("all");

  const handleFilterChange = (duration) => {
    setFilterDuration(duration);
  };

  const filterSessions = (sessions) => {
    if (filterDuration === "30") {
      // Filter sessions for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return sessions.filter((se) => new Date(se.date) >= thirtyDaysAgo);
    } else if (filterDuration === "90") {
      // Filter sessions for the last 90 days
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return sessions.filter((se) => new Date(se.date) >= ninetyDaysAgo);
    } else if (filterDuration === "365") {
      // Filter sessions for the last 1 year
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return sessions.filter((se) => new Date(se.date) >= oneYearAgo);
    }
    return sessions;
  };

  return (
    <>
      <h1 className="H1">Sessions</h1>
      <p className="info-line">
        You can limit the rows of the table through the search option at the top of each column
      </p>
      <div>
        <select value={filterDuration} onChange={(e) => handleFilterChange(e.target.value)} className="p-1 rounded">
          <option value="all">All Sessions</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last 1 Year</option>
        </select>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(sessionQ) ?? (
        <TableR pageId={pageId}>
          {filterSessions(sessionQ?.data).map((se, i) => {
            const row = {};
            row["Date"] = new Date(se.date);
            row["Tutor"] = getFullName(se.course.teacher.user);
            row["Student"] = se.course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
            row["Course"] = se.course.topic.name;
            row["Session Held"] = se.isHeld;
            return row;
          })}
        </TableR>
      )}
    </>
  );
};

export default PayerDash;

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sessionPayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `*, 
          course!inner (*, courseStudent(student(user(*))), teacher(user(*)), topic(*), payer(*, user(*))), packagePurchased(*)`
        )
        .filter("course.payerId", "eq", session.user.id)
        .filter("isHeld", "neq", "CON")
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
