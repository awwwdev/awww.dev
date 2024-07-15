import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { frmCAD, getFullName } from "@/utils/formatter";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { uniquesValue } from "@/utils/uniqueValue";
import { useMonths } from "@/components/MonthsProvider";
import useAdminAccess from "@/hooks/useAdminAccess";

export default function Page() {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const months = useMonths();
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

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      {renderNoData(sessionQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const allSessionTeacherCount = sessionQ.data.filter(
              (s) => s.packagePurchased && s.packagePurchased.course.teacher.user.id === teacher.user.id
            );
            let allSessionTeacher = 0;
            for (const se of allSessionTeacherCount) {
              allSessionTeacher = allSessionTeacher + se.calculatedCost_helper;
            }
            const allSessionTeacherCost = frmCAD(allSessionTeacher);
            const row = {};
            row["Teacher Name"] = getFullName(user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row["All Session Teacher Cost"] = allSessionTeacherCost;
            for (const month of months.slice(0, 3)) {
              const allSessionTeacherMonthCount = sessionQ.data.filter(
                (s) =>
                  month.includes(s.date) &&
                  s.packagePurchased &&
                  s.packagePurchased.course.teacher.user.id === teacher.user.id
              );
              let allSessionTeacherMonth = 0;
              for (const se of allSessionTeacherMonthCount) {
                allSessionTeacherMonth = allSessionTeacherMonth + se.calculatedCost_helper;
              }
              const allSessionTeacherMonthCost = frmCAD(allSessionTeacherMonth);
              row[month.yearMonth] = allSessionTeacherMonthCost;
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
