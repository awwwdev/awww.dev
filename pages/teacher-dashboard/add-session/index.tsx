import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/table-core";
import { useState } from "react";

const TeacherDash = () => {
  const pageId = window.location.pathname;
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const [showHiddenCourses, setShowHiddenCourses] = useState(false); // Add this state

  const courseQ = useQuery({
    queryKey: ["courseTeacherDash-53"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `id, requestDate, isHidden, isWorkshop, requestedSessionDurationInMinute, teacherId, courseStudent(student(user(*)))`
        )
        .match({ teacherId: userMeQ.data?.teacher.id })
        .match({ isWorkshop: false })
        .order("requestDate", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.teacher.id,
  });

  const toggleCourseHiddenStatus = useMutation(
    async ({ courseId, isHidden }: any) => {
      const { data, error } = await supabase.from("course").update({ isHidden: !isHidden }).eq("id", courseId).select();
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["courseTeacherDash-53"]);
      },
    }
  );

  const handleToggleHiddenStatus = (courseId, isHidden) => {
    toggleCourseHiddenStatus.mutate({ courseId, isHidden }); // Toggle the isHidden value
  };

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Change Hidden Status",
      header: "Change Hidden Status",
      cell: (info) => {
        const courseId = info.row.getValue("Add New Session");
        const isHidden = info.getValue();
        return (
          <button onClick={() => handleToggleHiddenStatus(courseId, isHidden)} className="btn-ghost min-w-full">
            {isHidden ? "Unhide" : "Hide"}
          </button>
        );
      },
    },
    {
      id: "Add New Session",
      header: "Add New Session",
      cell: (info) => {
        return (
          <Link
            target="_blank"
            href={`/teacher-dashboard/add-session/${info.getValue()}/`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            Add
          </Link>
        );
      },
    },
    {
      id: `Duration`,
      header: "Duration",
      cell: (info) => {
        return (
          <>
            {info.getValue && (
              <div className="space-y-1 fw-300">
                <span>{info.getValue()}</span>
                <span className=" text-xs c-gray8 fw-300">{` `}Min</span>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="H1">
        {" "}
        Select<span className="fw-200"> course</span>
      </h1>
      <div>
        <button onClick={() => setShowHiddenCourses(!showHiddenCourses)} className="text-accent10">
          {showHiddenCourses ? "Show Active Courses Only" : "Show All Courses"}
        </button>
      </div>
      <>
        {renderNoData(courseQ) ?? (
          <TableR schema={schema} pageId={pageId}>
            {renderNoData(courseQ) ||
              (showHiddenCourses
                ? courseQ.data?.map((course) => {
                    const row = {};
                    row["Student"] = course.courseStudent.map((c) => getFullName(c.student.user)).join(", ") ?? "";
                    row["Duration"] = course.requestedSessionDurationInMinute ?? "";
                    row["Add New Session"] = course.id;
                    row["Change Hidden Status"] = course.isHidden;
                    return row;
                  })
                : courseQ.data
                    ?.filter((course) => !course.isHidden)
                    .map((course) => {
                      const row = {};
                      row["Student"] = course.courseStudent.map((c) => getFullName(c.student.user)).join(", ") ?? "";
                      row["Duration"] = course.requestedSessionDurationInMinute ?? "";
                      row["Add New Session"] = course.id;
                      row["Change Hidden Status"] = course.isHidden;
                      return row;
                    }))}
          </TableR>
        )}
      </>
    </>
  );
};

export default TeacherDash;
