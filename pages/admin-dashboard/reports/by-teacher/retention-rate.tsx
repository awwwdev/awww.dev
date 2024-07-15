import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { frmPercentage, getFullName } from "@/utils/formatter";
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

  const courseQ = useQuery({
    queryKey: ["courseAdminDashReports-5"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `id, requestDate, introductionStatus, packagePurchased (id), teacher(id, user(id, firstname, lastname))`
        );
      if (error) throw error;
      return data;
    },
  });

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        Retention <span className="fw-200">by Teacher</span>
      </h1>
      {renderNoData(courseQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const IntrosRequested = courseQ.data.filter((c) => c.teacher.id === teacher.id).length;
            const IntrosHeld = courseQ.data.filter(
              (c) => c.teacher.id === teacher.id && c.introductionStatus === "YES"
            ).length;
            const IntrosLedToPackage = courseQ.data.filter(
              (c) => c.teacher.id === teacher.id && c.packagePurchased.length > 0
            ).length;
            const row = {};
            const dateJoined = teacher.dateJoined ? new Date(teacher.dateJoined) : null;
            row[`Teacher Name`] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row[`Date Joined Darsoon`] = dateJoined ?? "---";
            row[`Days With Darsoon`] = dateJoined
              ? (new Date(Date.now()) - dateJoined.getTime()) / (24 * 60 * 60 * 1000)
              : "";
            row[`All Introduction Session Ordered`] = IntrosRequested ?? "";
            row[`All Introduction Session Held`] = IntrosHeld ?? "";
            row[`Introductions Led to Package Purchase`] = IntrosLedToPackage ?? "";
            row[`Retention Rate Percentage`] = frmPercentage(IntrosLedToPackage / IntrosHeld) ?? "";
            return row;
          })}
        </TableR>
      )}
    </>
  );
}

/*                   for (const month of months.slice(0, 3)) {
                          row[month.yearMonth] = frmPercentage(uniquesCount(sessionQ.data.filter(se => months[0].includes(se.date) && se.packagePurchased && se.packagePurchased.course.teacher.user.id === teacher.user.id).map(se => se.packagePurchased.course.courseStudent).flat().map(cs => cs.studentId))/studentQ.data.filter(s => s.courseStudent[0] && s.courseStudent.course.expertise.teacher.user.id === teacher.user.id).length);
                        } */

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
    queryKey: ["courseAdminDashReports-5"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `id, requestDate, introductionStatus, packagePurchased (id), teacher(id, user(id, firstname, lastname))`
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
