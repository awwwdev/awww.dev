import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { DEFAULT_TEACHER_COMMISSION } from "@/constants";
import { frmCAD } from "@/utils/formatter";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMonths } from "@/components/MonthsProvider";
import Lnk from "@/components/Lnk";
import { calcSessionCost } from ".";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import useGetUserMe from "@/hooks/useGetUserMe";

const Page: NextPage = () => {
  const router = useRouter();
  const { yearMonth } = router.query;
  const months = useMonths();
  const selectedMonth = months.find((m) => m.yearMonth.replaceAll(" ", "-") === yearMonth);

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

  if (!selectedMonth) return <div>Invalid Month!</div>;

  return (
    <div className="space-y-8">
      <div className="b-t-1 space-y-2">
        <div className="flex gap-2 flex-wrap">
          {months.map((m, i) => (
            <Lnk
              key={i}
              href={`/teacher-dashboard/payments/${m.yearMonth.replaceAll(" ", "-")}`}
              className="x-2 px-1 text-2xs data-[in-sub-path]:bg-orange4"
            >
              {m.yearMonth}
            </Lnk>
          ))}
        </div>
      </div>
      {renderNoData(sessionQ) ?? (
        <PaymentsTable userMeQ={userMeQ} selectedMonth={selectedMonth} sessions={sessionQ.data} />
      )}
    </div>
  );
};

export default Page;

const PaymentsTable = ({ sessions, selectedMonth, userMeQ }) => {
  const monthSessions = sessions.filter((s) => selectedMonth.includes(s.date));
  /*   const commission = sessions.course.teacher.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION; */

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="italic c-sand11">Payment Calculation</p>
        <h1 className="H1">{selectedMonth.yearMonth}</h1>
      </div>
      {monthSessions && monthSessions.length > 0 && (
        <PageContent
          commission={userMeQ.data.teacher.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION}
          numberOfSessionsInThisMonth={monthSessions.length}
        >
          {monthSessions.map((se) => {
            let row = { ...se };

            delete row.packagePurchased;
            delete row.course;

            row = {
              date: new Date(row.date),
              ...calcSessionCost(se),
            };
            return row;
          })}
        </PageContent>
      )}
    </div>
  );
};

const PageContent = ({ children, commission, numberOfSessionsInThisMonth }) => {
  const rows = children;

  return (
    <>
      <div>
        <p>Commission Rate : {commission} </p>
        <p className="text-xl fw-700">
          Total Before Commission: {frmCAD(rows.reduce((acc, r) => (acc += r["Cost"]), 0))}
        </p>
        <p className="text-xl fw-700">
          Total After Commission: {frmCAD(rows.reduce((acc, r) => (acc += r["Cost"]), 0) * (100 - commission) * 0.01)}
        </p>
        <p className="text-xl fw-700">Number of Sessions: {numberOfSessionsInThisMonth}</p>
      </div>
      <TableR hasHorizontalScroll={false}>{rows}</TableR>
    </>
  );
};

// const getLatestExpertiseForCourse = (course) => {
//   let exs = course.expertise;
//   exs = exs.filter((e) => e.topicId === course.topicId);
//   exs = exs.filter((e) => e.teacherId === course.teacherId);

//   const latestExpertise = exs.reduce(
//     (latest, e) => (Date.parse(latest.startDate) > Date.parse(e.startDate) ? latest : e),
//     exs[0].startDate
//   );

//   return latestExpertise;
// };

// export const calcSessionCost = (se) => {

//   const normalSessionCost =
//     se?.packagePurchased?.expertise.sessionPriceInCAD ?? getLatestExpertiseForCourse(se.course).sessionPriceInCAD;
//   const sessionDurationOnWebsite = se.course.expertise.sessionDurationOnWebsiteInMinute;
//   const requestedDuration = se.course.requestedSessionDurationInMinute;
//   const studentsCount = se.course.courseStudent.length;
//   const numberOfSessions = se.packagePurchased?.numberOfSessions ?? 'no-package';
//   const sessionsCountMap = {
//     1: 1.15,
//     10: 0.95,
//     13: 0.95,
//     15: 0.95,
//     20: 0.95,
//   };

//   const sessionsCountFactor = sessionsCountMap[numberOfSessions] ?? 1;
//   const durationFactor = requestedDuration ? requestedDuration / sessionDurationOnWebsite : 1;
//   const studentCountFactor = (studentsCount - 1) * 0.2 + 1;
//   const isHeldMap = {
//     YES: 1,
//     NO: 0.5,
//     CON: 0.5,
//   };
//   const isHeldFactor = isHeldMap[se.isHeld];
//   const sessionCalculatedCost =
//     sessionsCountFactor * durationFactor * studentCountFactor * isHeldFactor * normalSessionCost;

//   return {
//     'Calculated Cost (with factors)': frmCAD(sessionCalculatedCost),
//     'Normal Cost (from expertise)': frmCAD(normalSessionCost),
//     sessionsCountFactor,
//     durationFactor,
//     studentCountFactor,
//     isHeldFactor,
//     hasPackage: se.packagePurchased ? 'with package' : 'no package',
//   };
// };
