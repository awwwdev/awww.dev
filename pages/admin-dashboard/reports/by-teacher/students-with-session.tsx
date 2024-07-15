import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { getFullName } from "@/utils/formatter";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { uniquesCount } from "@/utils/uniqueCount";
import { useMonths } from "@/components/MonthsProvider";
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
          `date, isHeld, calculatedCost_helper, packagePurchased(course(teacher(id, user(id, firstname, lastname)), courseStudent(studentId)))`
        )
        .filter("isHeld", "eq", "YES");
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      {renderNoData(sessionQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            row["Teacher Name"] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row["Completed Intros"] = uniquesCount(
              sessionQ.data
                .filter((se) => se.packagePurchased && se.packagePurchased.course.teacher.user.id === teacher.user.id)
                .map((se) => se.packagePurchased.course.courseStudent)
                .flat()
                .map((cs) => cs.studentId)
            );
            for (const month of months.slice(0, 3)) {
              row[month.yearMonth] = uniquesCount(
                sessionQ.data
                  .filter(
                    (se) =>
                      month.includes(se.date) &&
                      se.packagePurchased &&
                      se.packagePurchased.course.teacher.user.id === teacher.user.id
                  )
                  .map((se) => se.packagePurchased.course.courseStudent)
                  .flat()
                  .map((cs) => cs.studentId)
              );
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
          `date, isHeld, calculatedCost_helper, packagePurchased(course(teacher(id, user(id, firstname, lastname)), courseStudent(studentId)))`
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
