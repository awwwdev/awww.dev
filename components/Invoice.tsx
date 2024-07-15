import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import { DEFAULT_TEACHER_COMMISSION } from "@/constants";
import { frmCAD } from "@/utils/formatter";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMonths } from "@/components/MonthsProvider";
import Lnk from "@/components/Lnk";
import { calcSessionCost } from "@/pages/teacher-dashboard/payments";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetUserMe from "@/hooks/useGetUserMe";
import Link from "next/link";
import SignatureCanvas from "react-signature-canvas";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const months = useMonths();
  const selectedMonth = months[1];
  const queryClient = useQueryClient();
  const [signature, setSignature] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL();
      // Check if the signature canvas is empty
      if (sigCanvas.current.isEmpty()) {
        setIsSignatureEmpty(true);
      } else {
        setSignature(dataUrl);
        setIsSignatureEmpty(false);
      }
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsSignatureEmpty(true); // Signature is empty
    }
  };
  const saveAsPDF = async () => {
    const input = document.getElementById("content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output("blob");
    const userNameAndDate =
      userMeQ?.data && userMeQ.data.firstname + " " + userMeQ.data.lastname + " " + selectedMonth.yearMonth;
    // pdf.save(`${userNameAndDate}.pdf`);
    async function uploadFile(file) {
      const { data, error } = await supabase.storage.from("invoice").upload(`${userNameAndDate}.pdf`, file);
      if (error) {
        console.error("Error uploading file: ", error);
      } else {
        const { error } = await supabase
          .from("teacher")
          .update({ invoiceSubmitted: true })
          .eq("id", userMeQ.data?.teacher.id);

        if (error) {
          console.error("Error updating invoiceSubmitted: ", error);
        } else {
          queryClient.invalidateQueries({ queryKey: ["invoiceSubmitted-1"] });
        }
      }
    }
    uploadFile(pdfBlob);
  };

  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const teacherName = userMeQ?.data && userMeQ.data.firstname + " " + userMeQ.data.lastname;

  const sessionQ = useQuery({
    queryKey: ["sessionTeacherDash-4"],
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

  return (
    <>
      <p className="info-line mx-10 mt-10">To access your dashboard, first you should send us this invoice.</p>
      <div className="mx-10 my-10" id="content">
        {renderNoData(sessionQ) ?? (
          <>
            <PaymentsTable
              userMeQ={userMeQ}
              selectedMonth={selectedMonth}
              sessions={sessionQ.data}
              teacherName={teacherName}
            />
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "sigCanvas border rounded shadow bg-white" }}
            />
          </>
        )}
      </div>
      <div className="flex gap-4 mb-10 mx-10 mt-4">
        <button onClick={clearSignature} className="btn-ghost-accent">
          Clear
        </button>
        <button onClick={saveSignature} className="btn-accent">
          Save
        </button>
      </div>
      <button onClick={saveAsPDF} disabled={isSignatureEmpty} className="mb-10 mx-10 btn-accent">
        Send invoice
      </button>
    </>
  );
};

export default Invoice;

const PaymentsTable = ({ sessions, selectedMonth, userMeQ, teacherName }) => {
  const monthSessions = sessions.filter((s) => selectedMonth.includes(s.date));
  /*   const commission = sessions.course.teacher.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION; */

  return (
    <div className="space-y-6">
      <div className="space-y-2"></div>
      {monthSessions && monthSessions.length > 0 && (
        <PageContent
          commission={userMeQ.data.teacher.commissionPercentage ?? DEFAULT_TEACHER_COMMISSION}
          numberOfSessionsInThisMonth={monthSessions.length}
          selectedMonth={selectedMonth}
          teacherName={teacherName}
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

const PageContent = ({ children, commission, numberOfSessionsInThisMonth, selectedMonth, teacherName }) => {
  const pageId = window.location.pathname;
  const rows = children;

  return (
    <>
      <div>
        <p className="italic c-sand11">
          This invoice confirms that the amount of{" "}
          {frmCAD(rows.reduce((acc, r) => (acc += r["Cost"]), 0) * (100 - commission) * 0.01)} is accurate for my
          tutoring services provided in {selectedMonth.yearMonth}. I, {teacherName}, approve this amount for payment by
          Darsoon.
        </p>
      </div>
      <TableR pageId={pageId} hasHorizontalScroll={false}>
        {rows}
      </TableR>
    </>
  );
};
