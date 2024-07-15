import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { useMonths } from "@/components/MonthsProvider";
import { frmCAD, frmPercentage, getFullName } from "@/utils/formatter";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { uniquesValue } from "@/utils/uniqueValue";
import useAdminAccess from "@/hooks/useAdminAccess";

export default function Page() {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const teacherQ = useQuery({
    queryKey: ["teacherAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teacher")
        .select(`id , user(id , firstname , lastname), expertise(topic(category))`);
      if (error) throw error;
      return data;
    },
  });

  const sessionQ = useQuery({
    queryKey: ["sessionAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `date, isHeld, calculatedCost_helper,
            course(
              teacher(id, user(id, firstname, lastname)), courseStudent(studentId)
            )
          `
        )
        .filter("isHeld", "eq", "YES");
      if (error) throw error;
      return data;
    },
  });

  let sessionWithMonths = null;
  const months = useMonths();

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        Average Session Cost <span className="fw-200">by Teacher</span>
      </h1>
      {renderNoData(sessionQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            sessionWithMonths =
              sessionWithMonths ??
              months.map((m) => ({ ...m, sessions: sessionQ.data.filter((s) => m.includes(s.date)) }));
            const row = {};

            const allSessions = sessionQ.data.filter((s) => s.course.teacher.id === teacher.id);
            let allSessionsCosts = 0;
            for (const se of allSessions) allSessionsCosts = +Number(se.calculatedCost_helper);

            row["Teacher Name"] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row["Average Session Cost In CAD"] = frmCAD(allSessionsCosts / allSessions.length);

            for (const month of sessionWithMonths) {
              const allSessionMonth = month.sessions.filter((s) => s.course.teacher.id === teacher.id);
              let allSessionMonthCost = 0;
              for (const se of allSessionMonth) allSessionMonthCost += Number(se.calculatedCost_helper);
              row[month.yearMonth] = allSessionMonth.length
                ? frmPercentage(allSessionMonthCost / allSessionMonth.length)
                : "No Sessions";
            }
            return row;
          })}
        </TableR>
      )}
    </>
  );
}

/* export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  await queryClient.prefetchQuery({
    queryKey: ["teacherAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`id , user(id , firstname , lastname)`);
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["sessionAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `date, isHeld, calculatedCost_helper, course(teacher(id, user(id, firstname, lastname)), courseStudent(studentId))`
        );
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
