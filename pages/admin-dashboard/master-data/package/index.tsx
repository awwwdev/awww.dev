import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { getFullName } from "@/utils/formatter";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { schema } from "@/components/forms/AddUserForm";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const packageQ = useQuery({
    queryKey: ["packageMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(
          `*,
          course (requestedSessionDurationInMinute, 
              teacher(user(firstname, lastname)),
              topic(name),
              courseStudent (payer(user(firstname, lastname)), student (user(firstname, lastname))))`
        )
        .order("datePackagePurchased", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const sessionQ = useQuery({
    queryKey: ["packageSessionMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("session").select(`id, isHeld, packagePurchasedId`);
      if (error) throw error;
      return data;
    },
    enabled: packageQ.isSuccess,
  });

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Edit Records",
      header: "Edit Records",
      cell: (info) => {
        return info.getValue ? (
          <Link
            href={`/admin-dashboard/master-data/package/${info.row.getValue("Package ID")}`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Edit
          </Link>
        ) : null;
      },
    },
  ];

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <div className="rd-xl b-1 b-gray-6 bg-gray1 p-4 flex justify-end">
        <Link href="/admin-dashboard/master-data/package/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(packageQ) ?? renderNoData(sessionQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {packageQ.data.map((pkg) => {
            const row = {};
            row["Package ID"] = pkg.id;
            row["Package ID in Sheet"] = pkg.idInSheet;
            row["Teacher Name"] = getFullName(pkg.course.teacher.user);
            row["Students"] = pkg.course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
            row["Topic Name"] = pkg.course.topic.name;
            row["Payers"] = pkg.course.courseStudent.map((cs) => getFullName(cs.payer.user)).join(", ");
            row["Number Of Sessions"] = pkg.numberOfSessions ?? "";
            const sessionsForThisPackage = sessionQ.data.filter(
              (session) => session.packagePurchasedId === pkg.id && session.isHeld !== "CON"
            );
            row["Remaining Sessions"] = pkg.numberOfSessions - sessionsForThisPackage.length ?? "";
            row["Date Package Purchased"] = new Date(pkg.datePackagePurchased);
            row["Course ID"] = String(pkg.courseId);
            row["Session Duration In Minute"] = pkg.course.requestedSessionDurationInMinute ?? "";
            row["Edit Records"] = "";
            return row;
          })}
        </TableR>
      )}
    </div>
  );
};

export default AdminDash;

/* export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  await queryClient.prefetchQuery({
    queryKey: ["packageMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(
          `*, 
          course (* , 
              payer(*, user (*)), 
              teacher(*, user(*)),
              topic(*),
              courseStudent (* , student (*, user(*)))
        )`
        )
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
} */
