import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { getFullName } from "@/utils/formatter";
import { useMonths } from "@/components/MonthsProvider";
import { useMemo } from "react";
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
          `date, isHeld, calculatedCost_helper, course(teacher(id, user(id, firstname, lastname)), courseStudent(studentId))`
        )
        .filter("isHeld", "eq", "YES");
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();

  const computeMonthsWithSessions = () => {
    if (!sessionQ.data) return null;
    const res = months.map((m) => {
      const sessions = sessionQ.data.filter((se) => m.includes(se?.date));
      return { ...m, sessions };
    });
    return res;
  };
  const computeHeldSessions = () => {
    if (!sessionQ.data) return null;
    return sessionQ.data;
  };
  const monthWithSessions = useMemo(computeMonthsWithSessions, [sessionQ.data, months]);
  const heldSessions = useMemo(computeHeldSessions, [sessionQ.data]);

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        Sessions <span className="fw-200">by Teacher</span>
      </h1>
      {renderNoData(sessionQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            row["Teacher Name"] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row["Number Of Sessions"] = heldSessions.filter((s) => s.course.teacher.id === teacher.id).length;
            for (const month of monthWithSessions) {
              row[month.yearMonth] = month.sessions.filter((s) => s.course.teacher.id === teacher.id).length;
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
