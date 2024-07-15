import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { frmCAD, frmPercentage } from "@/utils/formatter";
import { useMonths } from "@/components/MonthsProvider";
import { uniquesCount } from "@/utils/uniqueCount";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page = () => {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const courseQ = useQuery({
    queryKey: ["courseAdminDashReports-6"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, requestDate, introductionStatus, packagePurchased(id)`);
      if (error) throw error;
      return data;
    },
  });

  const newStudentsQ = useQuery({
    queryKey: ["studentAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("student").select(`dateJoined`);
      if (error) throw error;
      return data;
    },
  });

  const paymentsPQ = useQuery({
    queryKey: ["paymentByPayerAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("paymentByPayer").select(`date, amountBeforeDiscountsInCAD`);
      if (error) throw error;
      return data;
    },
  });

  const teacherQ = useQuery({
    queryKey: ["teacherAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`id, expertise(startDate)`);
      if (error) throw error;
      return data;
    },
  });

  const sessionQ = useQuery({
    queryKey: ["sessionAdminDashReports-3"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `rateMultiplierInSheet, isHeld, date, id,
    course  (
      id, requestedSessionDurationInMinute, topicId , numberOfStudents,
      courseStudent (id, studentId),
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
        .filter("isHeld", "eq", "YES");
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();

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

  const calcSessionCost = (se) => {
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

  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <>
      <h1 className="H1">Overall Reports</h1>
      {renderNoData(sessionQ) ??
        renderNoData(courseQ) ??
        renderNoData(newStudentsQ) ??
        renderNoData(paymentsPQ) ??
        renderNoData(courseQ) ??
        renderNoData(teacherQ) ?? (
          <div>
            <p className="c-sand11">
              Overall Retention Rate:{" "}
              {frmPercentage(
                uniquesCount(
                  sessionQ.data
                    .filter((se) => months[0].includes(se.date))
                    .map((se) => se.course.courseStudent)
                    .flat()
                    .map((cs) => cs.studentId)
                ) / newStudentsQ.data.length
              )}
            </p>
            <TableR pageId={pageId}>
              {months.map((month) => {
                const allPaymentPMonth = paymentsPQ.data.filter((p) => month.includes(p.date));
                let allPaymentP = 0;
                for (const payment of allPaymentPMonth) {
                  allPaymentP = allPaymentP + payment.amountBeforeDiscountsInCAD;
                }
                const allSessionMonth = sessionQ.data.filter((s) => month.includes(s.date));
                let allSessionCost = 0;
                for (const se of allSessionMonth) {
                  allSessionCost = allSessionCost + calcSessionCost(se)["Calculated Cost (with factors)"];
                }
                /*               const allTeacherStartDate = teacherQ.data.filter(t => month.includes(t.expertise.map(e => e.startDate))); */
                const allTeacherExpertise = teacherQ.data.filter((t) => t.expertise).flat();
                let earliestExpertise = allTeacherExpertise[0];
                for (let i = 1; i < allTeacherExpertise.length; i++) {
                  let currentExpertise = allTeacherExpertise[i];
                  if (currentExpertise.startDate < earliestExpertise.startDate) {
                    earliestExpertise = currentExpertise;
                  }
                }
                const row = { month: month.yearMonth };
                row["Held Sessions"] = sessionQ.data.filter((hs) => month.includes(hs.date)).length;
                row["New Courses"] = courseQ.data.filter((c) => month.includes(c.requestDate)).length;
                row["New Students"] = newStudentsQ.data.filter((s) => month.includes(s.dateJoined)).length;
                row["Payments By Payers"] = frmCAD(allPaymentP);
                row["Session Costs"] = frmCAD(allSessionCost);
                row["Average Session Price In CAD"] = frmCAD(allSessionCost / allSessionMonth.length);
                row["Success Rate For Intros"] = frmPercentage(
                  courseQ.data.filter(
                    (c) => month.includes(c.requestDate) && c.packagePurchased?.length && c.introductionStatus === "YES"
                  ).length /
                    courseQ.data.filter((c) => month.includes(c.requestDate) && c.introductionStatus === "YES").length
                );
                row["Number Of Students With Session"] = uniquesCount(
                  sessionQ.data
                    .filter((se) => month.includes(se.date))
                    .map((se) => se.course.courseStudent)
                    .flat()
                    .map((cs) => cs.studentId)
                );
                row["Number Of Completed Intros"] = courseQ.data.filter(
                  (cs) => month.includes(cs.requestDate) && cs.introductionStatus === "YES"
                ).length;
                row["Number Of Teachers"] = allTeacherExpertise.reduce((pre, cur) =>
                  Date.parse(pre) < Date.parse(cur) ? pre : cur
                ).length;
                return row;
              })}
            </TableR>
          </div>
        )}
    </>
  );
};

export default Page;

/* export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  await queryClient.prefetchQuery({
    queryKey: ["courseAdminDashReports-6"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, requestDate, introductionStatus, packagePurchased(id)`);
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["studentAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `id, requestDate, introductionStatus, packagePurchased (id), teacher(id, user(id, firstname, lastname))`
        );
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["paymentByPayerAdminDashReports-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("paymentByPayer").select(`date, amountBeforeDiscountsInCAD`);
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["teacherAdminDashReports-2"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher").select(`id, expertise(startDate)`);
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["sessionAdminDashReports-3"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(`date,calculatedCost_helper, isHeld, course(courseStudent(studentId))`);
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
