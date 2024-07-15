import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/table-core";

const TeacherDash = () => {
  const pageId = window.location.pathname
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const studentQ = useQuery({
    queryKey: ["studentTeacherDash-21"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(
          `yearOfBirth, user(*),
      courseStudent!inner(payer(user(*)), course!inner(teacherId, id, requestDate, requestMessage, requestedSessionDurationInMinute, isWorkshop, introductionDate, payer(user(*)), topic(name), teacher(user(*))))`
        )
        .filter("courseStudent.course.teacherId", "eq", userMeQ.data?.teacher.id)
        .filter("courseStudent.course.isWorkshop", "eq", false);
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.teacher.id,
  });

if (studentQ.data && studentQ.data.length > 0) {
  // Sort studentQ.data based on requestDate in descending order
  studentQ.data.sort((a, b) => {
    const dateA = new Date(a.courseStudent[0].course.requestDate);
    const dateB = new Date(b.courseStudent[0].course.requestDate);

    // Compare the dates in descending order
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });
}
  const schema: ColumnDef<any, any>[] = [
    {
      id: "Add Intro Date",
      header: "Add Intro Date",
      cell: (info) => {
        const today = new Date();
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(today.getDate() - 7);
        const introDate = new Date(info.row.getValue("Intro Date"));
        if (info.row.getValue("Intro Date") === "") {
          return (
            <Link
              target="_blank"
              href={`/teacher-dashboard/${info.getValue()}/add-introduction-date`}
              className="flex ac jc gap-1 c-blue11 text-sm"
            >
              Add Introduction Date
            </Link>
          );
        } else if (introDate > twoWeeksAgo) {
          return (
            <Link
              target="_blank"
              href={`/teacher-dashboard/${info.getValue()}/edit-introduction-date`}
              className="flex ac jc gap-1 c-blue11 text-sm"
            >
              Edit Introduction Date
            </Link>
          );
        }
        else {
          return ""
        }
      },
    },
  ];

  return (
    <>
      <h1 className="H1">
        {" "}
        Class <span className="fw-200">Requests</span>
      </h1>
      <>
        {renderNoData(studentQ) ?? (
          <TableR schema={schema} pageId={pageId}>
            {studentQ.data.map((s) => {
              const row = {};
              row["Student"] = getFullName(s.user) ?? "";
              row["Intro Date"] = s.courseStudent[0].course.introductionDate
                ? new Date(s.courseStudent[0].course["introductionDate"])
                : "";
              row["Add Intro Date"] = s.courseStudent[0].course.id ?? "";
              row["Year Of Birth"] = s.yearOfBirth ?? "";
              row["Payer"] = Array.isArray(s.courseStudent[0].payer)
                ? s.courseStudent[0].payer.map((cs) => getFullName(cs.user)).join(", ")
                : getFullName(s.courseStudent[0].payer.user) ?? "";
              row["Email"] = Array.isArray(s.courseStudent[0].payer)
                ? s.courseStudent[0].payer.map((cs) => cs.user.email).join(", ")
                : s.courseStudent[0].payer.user.email ?? "";
              row["Phone"] = Array.isArray(s.courseStudent[0].payer)
                ? s.courseStudent[0].payer.map((cs) => cs.user.phoneCountryCode + cs.user.phone).join(", ")
                : s.courseStudent[0].payer.user.phoneCountryCode + s.courseStudent[0].payer.user.phone ?? "";
              row["Course"] = s.courseStudent[0].course.topic.name ?? "";
              row["Request Date"] = s.courseStudent[0].course.requestDate
                ? new Date(s.courseStudent[0].course["requestDate"])
                : "";
              row["Message"] = s.courseStudent[0].course.requestMessage ?? "";
              row["Duration"] = s.courseStudent[0].course.requestedSessionDurationInMinute ?? "";
              return row;
            })}
          </TableR>
        )}
      </>
    </>
  );
};

export default TeacherDash;

/* export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["studentTeacherDash-21"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(
          `yearOfBirth, user(*),
      courseStudent!inner(course!inner(teacherId, id, requestDate, requestMessage, requestedSessionDurationInMinute, introductionDate, payer(user(*)), topic(name), teacher(user(*))))`
        )
        .filter("courseStudent.course.teacherId", "eq", session.user.id);
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
