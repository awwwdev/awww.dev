import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import Link from "next/link";
import { ColumnDef } from "@tanstack/table-core";
import Icon from "@/components/ui/Icon";

import { toast } from "react-hot-toast";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const queryClient = useQueryClient();

  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const courseQ = useQuery({
    queryKey: ["courseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `id, isWorkshop, idInSheet, numberOfStudents, requestedSessionDurationInMinute, introductionStatus, introductionDate, reasonForUnsuccessfulIntroduction, requestMessage, requestDate, isDisabled,
    topic (name, category),
    teacher (user(firstname, lastname)),
    courseStudent (payer (user (firstname, lastname)), student (user (firstname, lastname)))`
        )
        .neq("isDisabled", true)
        .order("requestDate", { ascending: false });
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const sessionQ = useQuery({
    queryKey: ["sessionCourseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("session").select(`isHeld, courseId`);
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const packageQ = useQuery({
    queryKey: ["packageCourseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("packagePurchased").select(`courseId, numberOfSessions`);
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const handleDisableCourse = async (info) => {
    const courseId = info.row.getValue("Course ID");
    const { data, error } = await supabase
      .from("course")
      .update({ isDisabled: true })
      .eq("id", courseId)
      .select()
      .single();
    if (error) throw error;
    toast.success("The course is successfully disabled");
    queryClient.invalidateQueries({ queryKey: ["courseMasterData-1"] });
  };

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Edit Records",
      header: "Edit Records",
      cell: (info) => {
        return info.getValue ? (
          <Link
            href={`/admin-dashboard/master-data/course/${info.row.getValue("Course ID")}`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Edit
          </Link>
        ) : null;
      },
    },
    {
      id: "Disable Records",
      header: "Disable Records",
      cell: (info) => {
        return info.getValue ? (
          <button onClick={() => handleDisableCourse(info)} className="btn-accent bf-i-ph-trash min-w-full">
            Disable
          </button>
        ) : null;
      },
    },
  ];
  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <div className="rd-xl b-1 b-gray-6 bg-gray1 p-4 flex justify-end">
        <Link href="/admin-dashboard/master-data/course/add" className="btn-accent bf-i-ph-plus">
          Add a new record
        </Link>
      </div>
      {renderNoData(courseQ) ?? renderNoData(sessionQ) ?? renderNoData(packageQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {courseQ.data.map((course) => {
            const row = {};
            row["Course ID"] = course.id;
            row["Is Workshop"] = course.isWorkshop;
            row["Course ID in Sheet"] = course.idInSheet;
            row["Number of Students"] = course.numberOfStudents ?? "";
            row["Students"] = course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
            row["Payers"] = course.courseStudent.map((cs) => getFullName(cs.payer.user)).join(", ");
            row["Topic Name"] = course.topic.name;
            row["Category Name"] = course.topic.category;
            row["Teacher Name"] = getFullName(course.teacher.user);
            row["Class Duration In Minute"] = course.requestedSessionDurationInMinute ?? "";

            const relatedPackages = packageQ.data.filter((pkg) => pkg.courseId === course.id);
            const totalSessionsInPackages = relatedPackages.reduce((total, pkg) => {
              return total + pkg.numberOfSessions;
            }, 0);

            const relatedSessions = sessionQ.data.filter(
              (session) => session.courseId === course.id && session.isHeld !== "CON"
            );

            const sessionsHeld = relatedSessions.length;

            const remainingSessions = totalSessionsInPackages - sessionsHeld;

            row["Remaining Sessions"] = remainingSessions ?? "";
            row["Introduction Status"] = course.introductionStatus;
            row["Introduction Date"] = new Date(course.introductionDate);
            row["Reason For Unsuccessful Introduction"] = course.reasonForUnsuccessfulIntroduction;
            row["Request Message"] = course.requestMessage;
            row["Request Date"] = new Date(course.requestDate);
            row["Edit Records"] = "";
            row["Disable Records"] = "";
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
    queryKey: ["courseMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `*,
    topic (*),
    teacher (*, user(*)),
    payer (* , user (*)),
    courseStudent (* , student (* , user (*)))`
        )
        .order("requestDate", { ascending: false });
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
