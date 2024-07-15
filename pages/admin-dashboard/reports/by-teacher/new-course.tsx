import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { getFullName } from "@/utils/formatter";
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

  const courseQ = useQuery({
    queryKey: ["courseAdminDashReports-4"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`requestDate, teacher(id, user(id, firstname, lastname)))`);
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        New Courses <span className="fw-200">by Teacher</span>
      </h1>
      {renderNoData(courseQ) ?? renderNoData(teacherQ) ?? (
        <TableR pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            row[`Teacher Name`] = getFullName(teacher.user);
            row[`Category`] = uniquesValue(teacher.expertise.map((ex) => ex.topic.category)).join(", ");
            row[`All Courses`] = courseQ.data.filter((c) => c.teacher.user.id === teacher.user.id).length;
            for (const month of months) {
              row[month.yearMonth] = courseQ.data.filter(
                (c) => month.includes(c.requestDate) && c.teacher.id === teacher.id
              ).length;
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
    queryKey: ["courseAdminDashReports-4"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`requestDate, teacher(id, user(id, firstname, lastname)))`);
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
