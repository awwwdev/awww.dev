import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useMonths } from "@/components/MonthsProvider";
import { frmCAD, getFullName, getFullNameFa } from "@/utils/formatter";
import { DEFAULT_TEACHER_COMMISSION } from "@/constants";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page = () => {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();

  const teacherQ = useQuery({
    queryKey: ["paymentToTeacherAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`id , commissionPercentage ,
          user ( 
           id , firstname , lastname, firstnameFa , lastnameFa
          )`);
      if (error) throw error;
      return data;
    },
  });

  const sessionQ = useQuery({
    queryKey: ["paymentToTeacherAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `
      rateMultiplierInSheet, isHeld, date, id,
    course!inner  (
      id, requestedSessionDurationInMinute, topicId , numberOfStudents, isWorkshop,
      courseStudent (id),
      teacher ( id , 
        user ( id , firstname , lastname, firstnameFa , lastnameFa),
        expertise ( id , sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
      )
    ),
    packagePurchased ( 
      id , numberOfSessions , 
      expertise ( id,  sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
    )`
        )
        .filter("course.isWorkshop", "eq", false);
      if (error) throw error;
      return data;
    },
  });

  const paymentQ = useQuery({
    queryKey: ["paymentToTeacherAdminDashReports-3"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentToTeacher")
        .select(
          `* , teacher ( id , user ( id , firstname , lastname, firstnameFa , lastnameFa) , expertise ( sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId ) )`
        )
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const months = useMonths();
  let monthWithSessions = null;
  let monthWithPayments = null;

  const schema: ColumnDef<any, any>[] = months.map((m) => {
    return {
      id: `${m.yearMonth}`,
      cell: (info) => {
        return (
          <>
            {info.getValue && (
              <div className="space-y-1 fw-300 text-right">
                <Link
                  target="_blank"
                  className=" flex justify-between gap-1 c-blue11"
                  href={`/admin-dashboard/reports/payment-to-teacher/${info.row.getValue(
                    "Teacher ID"
                  )}/${m.yearMonth.replaceAll(" ", "-")}`}
                >
                  {/* <span>Sessions:</span> */}
                  <span>{info.getValue().computed}</span>
                </Link>
                <p className="flex justify-between gap-1">
                  {/* <span>Received:</span> */}
                  <span>{info.getValue().real}</span>
                </p>
              </div>
            )}
          </>
        );
      },
    };
  });

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">Payments to Teachers Report</h1>
      <div className="space-y-2">
        <h2>Legend</h2>
        <p className="c-sand11 bf-i-ph-circle-fill before:opacity-100 before:c-blue11">
          Total of all sessions in the month (Click on the blue numbers to see sessions details)
        </p>
        <p className="c-sand11 bf-i-ph-circle-fill before:opacity-100 before:c-sand11">
          Total of payments to the teacher in the next month
        </p>
        <p className="c-sand11 info-line">Balance is the overall amount Darsoon needs to pay to the teacher</p>
      </div>
      {renderNoData(teacherQ) ?? renderNoData(sessionQ) ?? renderNoData(paymentQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {teacherQ.data.map((teacher) => {
            const row = {};
            (row["Teacher ID"] = teacher.id),
              (row["Teacher Name"] = getFullName(teacher.user)),
              (row["Teacher Farsi Name"] = getFullNameFa(teacher.user)),
              (row["Overall Sessions"] = 0),
              (row["Overall Payments Received"] = 0),
              (row["Balance"] = 0);

            monthWithSessions ??= months.map((m) => ({
              ...m,
              sessions: sessionQ.data.filter((se) => m.includes(se?.date)),
            }));
            monthWithPayments ??= months.map((m) => ({
              ...m,
              payments: paymentQ.data?.filter((p) => m.includes(p?.date)),
            }));
            let overallSessions = 0;
            for (const month of monthWithSessions) {
              const teacherSessionsInMonth = month.sessions.filter((s) => {
                const condition1 = s?.packagePurchased?.course?.teacher?.id === teacher.id;
                const condition2 = s?.course?.teacher?.id === teacher.id;
                return condition1 || condition2;
              });

              let total = 0;
              for (const se of teacherSessionsInMonth) {
                total = total + calcSessionCost(se)["Calculated Cost (with factors)"];
              }

              const commissionPercentage = teacher?.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION;
              const computed = frmCAD(total * (1 - commissionPercentage / 100));
              overallSessions += computed;
              row[month.yearMonth] = { computed, real: 0 };
            }

            let overallPaymentsReceived = 0;
            for (const month of monthWithPayments.slice(1)) {
              const nextMonth = monthWithPayments[monthWithPayments.indexOf(month) - 1];
              const teacherPaymentsForThisMonth = nextMonth.payments.filter((p) => p?.teacherId === teacher.id);
              let totalPayments = 0;
              for (const p of teacherPaymentsForThisMonth) {
                totalPayments = totalPayments + Number(p?.totalAmountInCAD);
              }
              const real = frmCAD(totalPayments);
              overallPaymentsReceived += real;
              row[month.yearMonth] = { ...row[month.yearMonth], real };
            }
            row["overallSessions"] = frmCAD(overallSessions);
            row["overallPaymentsReceived"] = frmCAD(overallPaymentsReceived);
            row["balance"] = frmCAD(overallSessions - overallPaymentsReceived);
            return row;
          })}
        </TableR>
      )}
    </>
  );
};

export default Page;

// export async function getServerSideProps(ctx) {
//   const queryClient = new QueryClient();
//   const supabase = createServerSupabaseClient(ctx);

//   await queryClient.prefetchQuery({
//     queryKey: ["paymentToTeacherAdminDashReports-1"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("teacher").select(`id , commissionPercentage ,
//           user (
//            id , firstname , lastname, firstnameFa , lastnameFa
//           )`);
//       if (error) throw error;
//       return data;
//     },
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ["paymentToTeacherAdminDashReports-2"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("session").select(`
//       rateMultiplierInSheet, isHeld, date, id,
//     course  (
//       id, requestedSessionDurationInMinute, topicId ,
//       courseStudent (id),
//       teacher ( id ,
//         user ( id , firstname , lastname, firstnameFa , lastnameFa),
//         expertise ( id , sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
//       )
//     ),
//     packagePurchased (
//       id , numberOfSessions ,
//       expertise ( id,  sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
//     )
//           `);
//       if (error) throw error;
//       return data;
//     },
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ["paymentToTeacherAdminDashReports-3"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("paymentToTeacher")
//         .select(
//           `* , teacher ( id , user ( id , firstname , lastname, firstnameFa , lastnameFa) , expertise ( sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId ) )`
//         )
//         .order("date", { ascending: false });
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

export const calcSessionCost = (se) => {
  const pkg = se.packagePurchased;
  let exp = pkg?.expertise ?? getLatestExpertise(se.course.teacher.expertise, se.course.topicId);
  /*   if (!exp) throw new Error("No expertise found for session "); */
  let sessionCalculatedCost = null;
  let normalSessionCost = null;
  let durationFactor = null;
  let studentCountFactor = null;
  let sessionsCountFactor = null;
  let isHeldFactor = null;
  let sessionDurationOnWebsite = null;
  let requestedDuration = null;
  let studentsCount = null;
  let numberOfSessions = null;
  const sessionsCountMap = {
    1: 1.15,
    10: 0.95,
    13: 0.95,
    15: 0.95,
    20: 0.95,
  };

  if (!exp) {
    sessionCalculatedCost = 0;
    normalSessionCost = 0;
    durationFactor = 0;
    studentCountFactor = 0;
    sessionsCountFactor = 0;
    isHeldFactor = 0;
  } else {
    normalSessionCost = exp.sessionPriceInCAD ? exp.sessionPriceInCAD : null;
    sessionDurationOnWebsite = exp.sessionDurationOnWebsiteInMinute;
    requestedDuration = se.course.requestedSessionDurationInMinute;
    studentsCount = se.course.numberOfStudents;
    numberOfSessions = se.packagePurchased?.numberOfSessions ?? "no-package";

    sessionsCountFactor = sessionsCountMap[numberOfSessions] ?? 1;
    durationFactor = requestedDuration ? requestedDuration / sessionDurationOnWebsite : 1;
    studentCountFactor = (studentsCount - 1) * 0.2 + 1;
    const isHeldMap = {
      YES: 1,
      NO: 0.5,
      CON: 0.5,
    };
    isHeldFactor = isHeldMap[se.isHeld];
    sessionCalculatedCost =
      sessionsCountFactor * durationFactor * studentCountFactor * isHeldFactor * normalSessionCost;
  }

  return {
    "Calculated Cost (with factors)": sessionCalculatedCost ? frmCAD(sessionCalculatedCost) : "N/A",
    "Normal Cost (from expertise)": normalSessionCost ? frmCAD(normalSessionCost) : "N/A",
    sessionsCountFactor,
    durationFactor,
    studentCountFactor,
    isHeldFactor,
    hasPackage: se.packagePurchased ? "Yes" : "No",
    hasExpertise: pkg?.expertise
      ? "Yes"
      : getLatestExpertise(se.course.teacher.expertise, se.course.topicId)
      ? `No, Using best match (Expertise Id : ${exp.id})`
      : "Not Found",
    ["Session Duration | from Expertise"]: sessionDurationOnWebsite,
    ["Session Duration Requested | from Course"]: requestedDuration,
    ["Students Count | number of course-student s for this course "]: studentsCount,
    ["Number of Sessions | from Package Purchased"]: numberOfSessions,
    ["SessionId"]: se.id,
    ["CourseId"]: se?.course?.id,
    ["ExpertiseId"]: exp?.id,
    ["PackageId"]: se?.packagePurchased?.id,
    ["Same Teacher in Expertise Test"]: exp?.teacherId === se?.course?.teacher?.id ? "Passed" : "Failed",
  };
};

const getLatestExpertise = (allExp, topicId) => {
  if (!allExp) return null;
  if (!topicId) return null;
  const matchedRecs = allExp.filter((ex) => {
    return ex.topicId === topicId;
  });

  if (matchedRecs.length === 0) return null;
  const latestExpertise = matchedRecs.reduce(
    (latest, exp) => (Date.parse(latest.startDate) > Date.parse(exp.startDate) ? latest : exp),
    matchedRecs[0]
  );
  if (!latestExpertise) return null;

  return latestExpertise;
};
