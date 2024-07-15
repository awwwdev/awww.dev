import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useMonths } from "@/components/MonthsProvider";
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

  const introCategoryQ = useQuery({
    queryKey: ["courseAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`requestDate, introductionStatus, packagePurchased(id) , topic(id , category)`);
      if (error) throw error;
      return data;
    },
  });
  const months = useMonths();

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">
        Success Rate for Intro <span className="fw-200">by Category</span>
      </h1>
      {renderNoData(introCategoryQ) ?? renderNoData(categoryQ) ?? (
        <TableR pageId={pageId}>
          {months.map((month) => {
            const row = { month: month.yearMonth };
            for (const cat of categoryQ.data) {
              const allIntros = introCategoryQ.data.filter(
                (c) => month.includes(c.requestDate) && c.topic.category === cat
              ).length;
              const successFullIntros = introCategoryQ.data.filter(
                (c) => c.packagePurchased.length > 0 && month.includes(c.requestDate) && c.topic.category === cat
              ).length;
              row[cat] = frmPercentage(successFullIntros / allIntros);
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
    queryKey: ["categoryAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select(`category`);
      if (error) throw error;
      const cats = data.map((t) => t.category);
      return cats;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["courseAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`requestDate, introductionStatus, packagePurchased(courseId) , topic(*)`);
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
