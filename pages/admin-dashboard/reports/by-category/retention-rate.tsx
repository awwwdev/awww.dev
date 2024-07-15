import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useMonths } from "@/components/MonthsProvider";
import { uniquesCount } from "@/utils/uniqueCount";
import { frmPercentage } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useAdminAccess from "@/hooks/useAdminAccess";

export default function Page() {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const categoryQ = useQuery({
    queryKey: ["categoryAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select(`category`);
      if (error) throw error;
      const cats = data.map((t) => t.category);
      const uniqueCats = new Set(cats);
      const uniqueCatsArr = Array.from(uniqueCats);
      return uniqueCatsArr;
    },
  });

  const sessionQ = useQuery({
    queryKey: ["sessionAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `
        date, isHeld, calculatedCost_helper,
           course(
            topic(*), 
            courseStudent(studentId)
           )
        `
        )
        .filter("isHeld", "eq", "YES");
      if (error) throw error;
      return data;
    },
  });
  const studentCategoryQ = useQuery({
    queryKey: ["studentAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("student").select(`dateJoined, courseStudent(course(topic(*)))`);
      if (error) throw error;
      return data;
    },
  });
  const months = useMonths();

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        Retention Rate <span className="fw-200">by Category</span>
      </h1>

      {renderNoData(sessionQ) ?? renderNoData(studentCategoryQ) ?? renderNoData(categoryQ) ?? (
        <TableR pageId={pageId}>
          {categoryQ.data.map((cat) => {
            const row = {
              categoryName: cat,
              retentionRate: frmPercentage(
                uniquesCount(
                  sessionQ.data
                    .filter((se) => months[0].includes(se.date) && se.course.topic.category === cat)
                    .map((se) => se.course.courseStudent.studentId)
                    .flat()
                ) /
                  // students that have at least one course in this category
                  studentCategoryQ.data.filter((s) => s.courseStudent.some((cs) => cs.course.topic.category === cat))
                    .length
              ),
            };
            return row;
          })}
        </TableR>
      )}
    </>
  );
}

// export async function getServerSideProps(ctx) {
//   const queryClient = new QueryClient();
//   const supabase = createServerSupabaseClient(ctx);

//   await queryClient.prefetchQuery({
//     queryKey: ["categoryAdminDashReports-1"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("topic").select(`category`);
//       if (error) throw error;
//       const cats = data.map((t) => t.category);
//       return cats;
//     },
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ["sessionAdminDashReports-1"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("session").select(`date, isHeld, calculatedCost_helper,
//            course(
//             topic(*),
//             courseStudent(studentId)
//            )
//         `);
//       if (error) throw error;
//       return data;
//     },
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ["studentAdminDashReports-1"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("student").select(`dateJoined, courseStudent(course(topic(*)))`);
//       if (error) throw error;
//       return data;
//     },
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
