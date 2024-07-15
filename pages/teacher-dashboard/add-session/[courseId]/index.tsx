import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { Database } from "@/supabase/db_types";
import { getFullName } from "@/utils/formatter";
import { renderNoData } from "@/components/RenderQ";
import Select from "@/components/Select";
import { useRouter } from "next/router";
import getProperPackageId from "@/utils/getProperPackageId";
import Link from "next/link";
import { ColumnDef } from "@tanstack/table-core";
import { TableR } from "@/components/Table";
import Icon from "@/components/ui/Icon";

const queryKey = "sessionMasterData-1";
const tableName = "session";

export const schema = z.object({
  date: z.string().min(1, "Please enter date here"),
  packagePurchasedId: z.string().optional().nullable(),
  isHeld: z.string().min(1, "Please enter isHeld here"),
  courseId: z.string().min(1, "Please enter course ID"),
});

export default function Page() {
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient<Database>();
  const userMeQ = useGetUserMe();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { courseId } = router.query;

  const courseQ: any = useQuery({
    queryKey: ["courseTeacherDash-12"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, courseStudent(student(user(*))), packagePurchased(numberOfSessions), session(id, isHeld)`)
        .eq("id", courseId);
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const validSessionsCount = courseQ?.data?.[0]?.session
    ? courseQ.data[0].session.filter((se) => se.isHeld !== "CON").length
    : 0;

  const [addedRecord, setAddedRecord] = useState(null);

  const todayDate = new Date();
  const todayDateCopy = new Date(todayDate);
  todayDateCopy.setDate(todayDateCopy.getDate() + 1);
  const today = `${todayDateCopy.getFullYear()}-${String(todayDateCopy.getMonth() + 1).padStart(2, "0")}-${String(
    todayDateCopy.getDate()
  ).padStart(2, "0")} 12:00`;

  const oneMonthAgoDate = new Date();
  const oneMonthAgoDateCopy = new Date(oneMonthAgoDate);
  oneMonthAgoDateCopy.setDate(oneMonthAgoDateCopy.getDate() - 32);
  const oneMonthAgo = `${oneMonthAgoDateCopy.getFullYear()}-${String(oneMonthAgoDateCopy.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(oneMonthAgoDateCopy.getDate()).padStart(2, "0")} 12:00`;

  const onSubmit = async (formValues) => {
    const selectedDate = new Date(formValues.date);

    // Check if the selected date exists in the database
    const dateExistsInDatabase = sessionQ.data.some((se) => {
      const sessionDate = new Date(se.date);
      // Compare the date portion only (ignoring time)
      return (
        selectedDate.getFullYear() === sessionDate.getFullYear() &&
        selectedDate.getMonth() === sessionDate.getMonth() &&
        selectedDate.getDate() === sessionDate.getDate()
      );
    });

    if (dateExistsInDatabase) {
      // If the date exists, show a confirmation dialog to the user
      const confirmSubmission = window.confirm(
        "Selected date already exists in the database. Do you want to submit anyway?"
      );

      if (!confirmSubmission) {
        // If the user clicks cancel, do nothing
        return;
      }
    }

    // If the date doesn't exist or if the user confirmed, proceed with the submission
    const correctFormValues = {
      ...formValues,
      packagePurchasedId: formValues?.packagePurchasedId === "" ? null : formValues?.packagePurchasedId,
      date: formValues?.date ? new Date(formValues?.date) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.teacher.id,
      addedByTeacherId: userMeQ.data?.teacher.id,
    };
    const { data, error } = await supabase.from(tableName).insert(correctFormValues).select().single();
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    setAddedRecord(data);
    window.location.reload();
  };

  const schema2: ColumnDef<any, any>[] = [
    {
      id: "Edit Records",
      header: "Edit Records",
      cell: (info) => {
        return (
          <Link
            href={`/teacher-dashboard/add-session/${courseId}/${info.getValue()}`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Edit
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

  const form = useFormHook({ schema, onSubmit });

  const packageQ = useQuery({
    queryKey: ["packageTeacherDash-1", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packagePurchased")
        .select(`id, numberOfSessions, datePackagePurchased, courseId, session(isHeld)`)
        .eq("courseId", courseId)
        .filter("session.isHeld", "neq", "CON")
        .order("datePackagePurchased", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const sessionQ = useQuery({
    queryKey: ["sessionTeacherDash-12"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(`id, date, isHeld, courseId, course(requestedSessionDurationInMinute)`)
        .eq("courseId", courseId)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  return (
    <>
      <h1 className="H1">
        Add Session <span className="fw-200">form</span>
      </h1>
      {renderNoData(courseQ) ??
        (courseQ.data[0]?.courseStudent && courseQ.data[0]?.courseStudent.length > 0 ? (
          <>
            <p className="fw-400 fs-xl">
              {courseQ.data[0]?.courseStudent.map((cs, index) => (
                <span key={cs.student.user.id}>
                  {index > 0 && ", "}
                  {getFullName(cs.student.user)}
                </span>
              ))}
            </p>
            <p>
              Remaining Sessions:{" "}
              {courseQ.data[0].packagePurchased.reduce((sum, p) => sum + p.numberOfSessions, 0) - validSessionsCount},
              Total Sessions: {courseQ.data[0].session.length}
            </p>
          </>
        ) : (
          <p>No students found for this course.</p>
        ))}

      <div className="">
        <div className="">
          <p className="">Add your sessions here. So they are counted for the next payment.</p>
          <p className="info-line pb-4">Submitted sessions will be reviewed by our admins. </p>
          <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Submit">
            <Form.Input name="date" type="datetime-local" min={oneMonthAgo} max={today} required />
            <div className="sr-only">
              <Form.Input name="courseId" id="courseId" required value={courseId} />
            </div>
            <div className="sr-only">
              {renderNoData(packageQ) ?? (
                <div className="sr-only">
                  {packageQ.data.length === 0 ? (
                    <Form.Input name="packagePurchasedId" id="packagePurchasedId" value={null} />
                  ) : packageQ.data.length === 1 ? (
                   <Form.Input
                      name="packagePurchasedId"
                      id="packagePurchasedId"
                      value={
                        Array.isArray(packageQ.data[0].session) &&
                        packageQ.data[0].numberOfSessions - packageQ.data[0].session.length > 0
                          ? packageQ.data[0].id
                          : null
                      }
                    />
                  ) : (
                   <Form.Input
                      name="packagePurchasedId"
                      id="packagePurchasedId"
                      value={getProperPackageId(packageQ.data)}
                    />
                  )}
                </div>
              )}
            </div>
            <ErrMsg name={"packagePurchasedId"} />

            <br />

            <label className="flex flex-col gap-1">
              <span className="c-sand11 fw-500 block capitalize">
                Was Session Held<sup className="c-red11"> *</sup>
              </span>
            </label>
            <Select
              name="isHeld"
              register={form.register}
              options={[
                ["YES", "YES"],
                ["NO", "NO"],
              ]}
              required
            />
            <ErrMsg name={"isHeld"} />
            <br />
          </Form>

          {addedRecord && (
            <div className="snack-success">
              <p className="">
                The session is submitted successfully. You can submit another session, by refilling this form again.
              </p>
              {/*               <p>
                <span className="H3">Submitted Session:</span>
                <br />
                <pre>{JSON.stringify(addedRecord, null, 2)}</pre>
              </p>
              <p>You can submit another session, by refilling this form again.</p> */}
            </div>
          )}
        </div>
      </div>

      {renderNoData(sessionQ) ?? (
        <div className="">
          <h2 className="fw-200 fs-2xl">Sessions of this course</h2>
          <TableR schema={schema2} pageId={pageId}>
            {sessionQ.data.map((se) => {
              const row = {};
              row["Date"] = new Date(se.date);
              row["Duration"] = se.course.requestedSessionDurationInMinute;
              row["Was Session Held"] = se.isHeld;
              row["Edit Records"] = se.id;
              return row;
            })}
          </TableR>
        </div>
      )}
    </>
  );
}
