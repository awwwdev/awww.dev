import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const feedbackQ = useQuery({
    queryKey: ["feedbackMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("feedback").select(`*, course(teacherId, teacher(user(*)))`);
      if (error) throw error;
      return data;
    },
  });

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Delete Records",
      header: "Delete Records",
      cell: (info) => {
        return info.getValue ? (
          <Link
            href={`/admin-dashboard/master-data/feedback/${info.row.getValue("Feedback ID")}`}
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
        <Link href="/admin-dashboard/master-data/feedback/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(feedbackQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {feedbackQ.data.map((feedback) => {
            const row = {};
            row["Date"] = new Date(feedback.created_at);
            row["Feedback ID"] = feedback.id;
            row["Feedback ID in Sheet"] = feedback.idInSheet;
            row["Course ID"] = String(feedback.courseId);
            row["Payer ID"] = String(feedback.payerId);
            row["Student Rating"] = feedback.studentRating ?? "";
            row["Student Feedback"] = feedback.studentFeedback;
            row["Teacher ID"] = String(feedback.course.teacherId);
            row["Teacher Name"] = getFullName(feedback.course.teacher.user);
            /*             row["Student ID"] = String(feedback.course.studentId);
            row["Student Name"] = getFullName(feedback?.student?.user); */
            row["Delete Records"] = "";
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
    queryKey: ["feedbackMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select(`*, teacher(*, user(*)) , student ( * , user ( *) , payer (* , user (*)))`);
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
