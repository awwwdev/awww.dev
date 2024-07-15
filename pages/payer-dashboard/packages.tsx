import { useState } from "react";
import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const PayerDash = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const packageQ = useQuery({
    queryKey: ["packagePayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(
          `*,
          course!inner (*, teacher(*, user(*)), topic(*), courseStudent!inner (*, payerId,  payer(*, user (*)) , student (*, user(*)))),
          session (id, isHeld)`
        )
        .filter("course.courseStudent.payerId", "eq", userMeQ.data?.payer.id)
        .filter("session.isHeld", "neq", "CON")
        .order("datePackagePurchased", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const toggleShowActiveOnly = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const filterPackages = (packages) => {
    if (showActiveOnly) {
      return packages.filter(
        (p) => p.numberOfSessions - p.session.length > 0
      );
    }
    return packages;
  };

  return (
    <>
      <h1 className="H1">Packages</h1>
      <p className="info-line">
        You can limit the rows of the table through the search option at the top of each column
      </p>
      <div>
        <button onClick={toggleShowActiveOnly} className="text-accent10">
          {showActiveOnly ? "Show All Packages" : "Show Active Packages Only"}
        </button>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(packageQ) ?? (
        <TableR pageId={pageId}>
          {filterPackages(packageQ?.data).map((p, i) => {
            const row = {};
            row["Tutor"] = getFullName(p.course.teacher.user);
            row["Course"] = p.course.topic.name;
            row["Student"] = p.course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
            row["Number Of Sessions"] = p.numberOfSessions ?? "";
            row["Remaining Sessions"] = p.numberOfSessions - p.session.length ?? "";
            row["Purchased Date"] = new Date(p.datePackagePurchased);
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
    queryKey: ["packagePayerDash-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(
          `*,
          course!inner (* , payer(*, user (*)), teacher(*, user(*)), topic(*), courseStudent (* , student (*, user(*)))),
          session (id, isHeld),
          feedback (*)`
        )
        .filter("course.payerId", "eq", session.user.id)
        .order("datePackagePurchased", { ascending: false });
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
