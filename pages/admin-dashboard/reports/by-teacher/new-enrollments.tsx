import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { frmPercentage, getFullName } from "@/utils/formatter";
import { useMonths } from "@/components/MonthsProvider";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
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

  const courseStudentQ = useQuery({
    queryKey: ["courseStudentAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courseStudent")
        .select(`id, course (requestDate, teacher(id, user(id, firstname, lastname)))`);
      if (error) throw error;
      return data;
    },
  });

  const courseQ = useQuery({
    queryKey: ["courseAdminDashReports-15"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, requestDate, teacher(id, user(id, firstname, lastname)))`);
      if (error) throw error;
      return data;
    },
  });

  const sessionQ = useQuery({
    queryKey: ["sessionAdminDashReports-15"],
    queryFn: async () => {
      const { data, error } = await supabase.from("session").select(`courseId, date`);
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();

  let monthsWithEnrollments = null;

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        New Enrollments <span className="fw-200">by Teacher</span>
      </h1>
      <p className="info-line">
        When a new or existing student starts enrolls in a new course, it counts as new student enrollment.
      </p>
      {renderNoData(courseStudentQ) ?? renderNoData(teacherQ) ?? renderNoData(courseQ) ?? renderNoData(sessionQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            row["Teacher Name"] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row["All Enrollments"] = courseStudentQ.data.filter((cs) => cs.course.teacher.id === teacher.id).length;
            const allCourses = courseQ.data.filter((c) => c.teacher.id === teacher.id);
            const successfulCourses = allCourses.filter((course) =>
              sessionQ.data.some((session) => session.courseId === course.id)
            );
            row["Rate of Success"] = frmPercentage(successfulCourses.length / allCourses.length);
            row["Active Courses"] = allCourses.filter((course) =>
              sessionQ.data.some(
                (session) =>
                  session.courseId === course.id &&
                  new Date(session.date).getTime() >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime()
              )
            ).length;
            monthsWithEnrollments =
              monthsWithEnrollments ??
              months.map((m) => ({
                ...m,
                enrollments: courseStudentQ.data.filter((cs) => m.includes(cs.course.requestDate)),
              }));

            for (const month of monthsWithEnrollments) {
              row[month.yearMonth] = month.enrollments.filter((cs) => cs.course.teacher.id === teacher.id).length;
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
    queryKey: ["courseStudentAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courseStudent")
        .select(`id, course (requestDate, teacher(id, user(id, firstname, lastname)))`);
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
