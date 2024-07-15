import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ColumnDef } from "@tanstack/table-core";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useMemo, useState } from "react";

const PayerDash = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const courseQ = useQuery({
    queryKey: ["coursePayerDash-1", showActiveOnly],
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
        .match({ isWorkshop: false })
        .filter("session.isHeld", "neq", "CON")
        .order("introductionDate", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const courses = useMemo(() => {
    if (!courseQ.data) return [];
    if (!showActiveOnly) return courseQ.data;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return courseQ.data.filter((course) => {
      const sessions = course.session.filter((s) => {
        const sessionDate = new Date(s.date);
        return sessionDate >= thirtyDaysAgo;
      });
      return sessions.length > 0;
    });
  }, [courseQ.data, showActiveOnly]);

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
    {
      id: "Renew",
      header: "Renew",
      cell: (info) => {
        return info.getValue ? (
          <Link  href={`/tutors/${info.getValue()}`} className="btn-accent">
            Renew
          </Link>
        ) : null;
      },
    },
  ];

  const handleToggleActiveOnly = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  return (
    <>
      <h1 className="H1"> Courses</h1>
      <div>
        <button onClick={handleToggleActiveOnly} className="text-accent10">
          {showActiveOnly ? "Show all courses" : "Show active courses only"}
        </button>
      </div>
      {renderNoData(userMeQ) ?? renderNoData(courseQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {courses.map((course, i) => {
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
            row["Renew"] = course.teacher.wixProfileNumber;
            return row;
          })}
        </TableR>
      )}
    </>
  );
};

export default PayerDash;
