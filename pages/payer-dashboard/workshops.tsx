import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ColumnDef } from "@tanstack/table-core";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const PayerDash = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const courseQ = useQuery({
    queryKey: ["workshopPayerDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `*,
        topic (name),
        teacher (*, user(*)),
        courseStudent!inner (payer (*, user (*)) , student (* , user (*))),
        packagePurchased (numberOfSessions),
        session (id, isHeld, date),
        feedback (*)`
        )
        .filter("courseStudent.payerId", "eq", userMeQ.data?.payer.id)
        .match({ isWorkshop: true })
        .filter("session.isHeld", "neq", "CON")
        .order("introductionDate", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Add Feedback",
      header: "Add Feedback",
      cell: (info) => {
        return info.getValue ? (
          <Link href={`/payer-dashboard/${info.getValue()}/add-feedback`} className="flex ac jc gap-1 c-blue11 text-sm">
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Write a Feedback
          </Link>
        ) : null;
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
      <h1 className="H1"> Workshops</h1>
      {renderNoData(userMeQ) ??
        renderNoData(courseQ) ??
        (courseQ.data.length > 0 ? (
          <TableR schema={schema} pageId={pageId}>
            {courseQ.data.map((course, i) => {
              const row = {};
              row["Subject"] = course.topic.name;
              row["Tutor"] = getFullName(course.teacher.user);
              row["Student"] = course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
              row["Number of Students"] = course.numberOfStudents ?? "";
              row["Duration"] = course.requestedSessionDurationInMinute ?? "";
              row["Remaining Session"] =
                course.packagePurchased.reduce((sum, p) => sum + p.numberOfSessions, 0) - course.session.length;
              row["Rating"] = course.feedback.map((f) => f.studentRating).join(", ");
              row["Feedback"] = course.feedback.map((f) => f.studentFeedback).join(", ");
              row["Add Feedback"] = course.id;
              return row;
            })}
          </TableR>
        ) : (
          <div>
            <p className="">
              We&apos;re excited to announce the launch of our new workshop section! This new section makes it easier than
              ever to find workshops that you attend.
            </p>
            <p>
              <strong>
                Make sure that you are familiar with our new{" "}
                <Link href="/workshops" >
                  workshops!
                </Link>
              </strong>
            </p>
          </div>
        ))}
    </>
  );
};

export default PayerDash;
