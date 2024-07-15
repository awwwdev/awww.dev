import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useMonths } from "@/components/MonthsProvider";
import { frmCAD, getFullName } from "@/utils/formatter";
import { DEFAULT_TEACHER_COMMISSION } from "@/constants";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { ColumnDef } from "@tanstack/table-core";

const Page = () => {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const sessionQ = useQuery({
    queryKey: ["sessionTeacherDash-3"],
    enabled: !!userMeQ.data?.teacher.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `
      rateMultiplierInSheet, isHeld, date, id,
    course!inner  (
      id, requestedSessionDurationInMinute, topicId , numberOfStudents, isWorkshop,
      courseStudent (id, student(user(firstname, lastname))),
      teacher ( id , commissionPercentage,
        user ( id , firstname , lastname, firstnameFa , lastnameFa),
        expertise ( id , sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
      )
    ),
    packagePurchased ( 
      id , numberOfSessions , 
      expertise ( id,  sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
    )
    `
        )
        .filter("course.teacherId", "eq", userMeQ.data?.teacher.id)
        .filter("course.isWorkshop", "eq", false);
      if (error) throw error;
      return data;
    },
  });

  const paymentQ = useQuery({
    queryKey: ["paymentToTeacherTeacherDash-1"],
    enabled: !!userMeQ.data?.teacher.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paymentToTeacher")
        .select(
          `* , teacher ( id , commissionPercentage, user ( id , firstname , lastname, firstnameFa , lastnameFa) , expertise ( sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId ) )`
        )
        .order("date", { ascending: false })
        .match({ teacherId: userMeQ.data?.teacher.id });
      if (error) throw error;
      return data;
    },
  });

  const months = useMonths();
  let monthWithSessions = null;
  let monthWithPayments = null;

  const schema: ColumnDef<any, any>[] = [
    {
      id: `Total`,
      header: "Total",
      cell: (info) => {
        return (
          <>
            {info.getValue && (
              <div className="space-y-1 fw-300 text-right">
                <Link
                  target="_blank"
                  className=" flex justify-between gap-1 c-blue11"
                  href={`/teacher-dashboard/payments/${(info.row.getValue("Month") as string).replaceAll(" ", "-")}`}
                >
                  <span>{info.getValue()}</span>
                  <span className=" text-2xs c-gray8 fw-300">{` `}CAD</span>
                </Link>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="H1">Pre Calculation of Your Payments</h1>
      <div className="space-y-2">
        <p className="c-sand11 bf-i-ph-circle-fill before:opacity-100 before:c-blue11">
          Net payable amount (Click on the blue numbers to see the details)
        </p>
      </div>
      {renderNoData(sessionQ) ?? renderNoData(paymentQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {months &&
            months.length > 0 &&
            months.map((month) => {
              const row = {};
              let thisMonthSessions = sessionQ.data.filter((se) => month.includes(new Date(se.date)));

              let total: number = 0;
              for (const se of thisMonthSessions) {
                const sessionCost = calcSessionCost(se)["Cost"];
                if (typeof sessionCost === "number") {
                  total += sessionCost;
                }
              }


              const commissionPercentage = userMeQ.data.teacher.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION;
              const computed = frmCAD(total * (1 - commissionPercentage / 100));

              let real = 0;
              if (months.indexOf(month) > 0) {
                const nextMonth = months[months.indexOf(month) - 1];
                const teacherPaymentsForThisMonth = paymentQ.data.filter((p) => nextMonth.includes(new Date(p.date)));
                let totalPayments = 0;
                for (const p of teacherPaymentsForThisMonth) {
                  totalPayments = totalPayments + Number(p?.totalAmountInCAD);
                }
                real = frmCAD(totalPayments);
              }
              row["Month"] = month.yearMonth;
              row["Total"] = computed ?? "";
              return row;
            })}
        </TableR>
      )}
    </>
  );
};

export default Page;

export const calcSessionCost = (se) => {
  const pkg = se.packagePurchased;
  let exp = pkg?.expertise ?? getLatestExpertise(se.course.teacher.expertise, se.course.topicId);
  let sessionCalculatedCost = null;
  let normalSessionCost = null;
  let durationFactor = null;
  let studentCountFactor = null;
  let sessionsCountFactor = null;
  let isHeldFactor = null;
  let sessionDurationOnWebsite = null;
  let requestedDuration = null;
  let studentsCount = null;
  let students = null;
  let numberOfSessions = null;
  let wasSessionHeld = null;
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
    studentsCount = parseInt(se.course.numberOfStudents);
    students = se.course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
    numberOfSessions = se.packagePurchased?.numberOfSessions ?? "no-package";
    wasSessionHeld = se.isHeld
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
    ["Cost"]: sessionCalculatedCost ? frmCAD(sessionCalculatedCost) : "N/A",
    ["Students"]: students,
    ["Was Session Held"]: wasSessionHeld,
    hasPackage: se.packagePurchased ? "Yes" : "No",
    ["Duration In Minute"]: requestedDuration,
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