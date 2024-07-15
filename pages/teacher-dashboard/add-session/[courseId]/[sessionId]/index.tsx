import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RecordTable from "@/components/RecordTable";
import { Database } from "@/supabase/db_types";
import { getFullName } from "@/utils/formatter";

const TeacherDash = () => {
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();
  const { courseId, sessionId } = router.query;
  const queryClient = useQueryClient();

  const courseQ: any = useQuery({
    queryKey: ["courseTeacherDash-12"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`id, courseStudent(student(user(*)))`)
        .eq("id", courseId);
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const recordQ = useQuery({
    queryKey: ["sessionTeacherDash-12", sessionId],
    queryFn: async () => {
      const { data, error } = await supabase.from("session").select(`*`).match({ id: sessionId }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!sessionId,
  });

  const [isJustDeleted, setIsJustDeleted] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase.from("session").delete().eq("id", sessionId);
    if (error) {
      toast.error("Failed to delete the record. | Error: " + error.message);
    } else {
      toast.success("Record is successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["sessionTeacherDash-12", sessionId], refetchType: "none" });
      queryClient.invalidateQueries({ queryKey: ["sessionTeacherDash-12"] });
      setIsJustDeleted(true);
    }
  };

  if (isJustDeleted)
    return (
      <div className="">
        <h1 className="H1">
          {" "}
          Edit <span className="fw-200">session</span>
        </h1>
        <div className="h-full flex jc ac">
          <p className="">You just deleted this record permanently.</p>
          {/*           <Link
            href={router.pathname.substring(0, router.pathname.lastIndexOf("/"))}
            className="btn-prm bf-i-ph-arrow-u-up-left"
          >
            {" "}
            Go Back{" "}
          </Link> */}
        </div>
      </div>
    );

  return (
    <>
      <h1 className="H1">
        {" "}
        Edit <span className="fw-200">session</span>
      </h1>
      {renderNoData(courseQ) ??
        (courseQ.data[0]?.courseStudent && courseQ.data[0]?.courseStudent.length > 0 ? (
          <p className="fw-400 fs-xl">
            {courseQ.data[0]?.courseStudent.map((cs, index) => (
              <span key={cs.student.user.id}>
                {index > 0 && ", "}
                {getFullName(cs.student.user)}
              </span>
            ))}
          </p>
        ) : (
          <p>No students found for this course.</p>
        ))}
      {renderNoData(recordQ) ?? (
        <div className="space-y-8">
          {recordQ.data ? (
            <>
              <div className="flex gap-4 justify-end p-4 b-1 b-gray5 rd-lg bg-gray2">
                <Link
                  href={`/teacher-dashboard/add-session/${courseId}/${sessionId}/edit`}
                  className="bf-i-ph-note-pencil btn-ghost"
                >
                  Edit
                </Link>
                <DeleteButton handleDelete={handleDelete} />
              </div>
              <div>
                <RecordTable
                  record={recordQ.data}
                  commonKeys={[
                    "id",
                    "created_at",
                    "updated_at",
                    "updated_by",
                    "packagePurchasedId",
                    "idInSheet",
                    "calculatedCost_helper",
                    "rateMultiplierInSheet",
                    "courseId",
                    "addedByTeacherId",
                    "isActionDoneByTeacher",
                  ]}
                  showCommonKeys={"sr-only"}
                />
                {/* <pre>{JSON.stringify(recordQ.data, null, 2)}</pre> */}
              </div>
            </>
          ) : (
            <div>There is no such a record in sessions.</div>
          )}
        </div>
      )}
    </>
  );
};

export default TeacherDash;

const DeleteButton = ({ handleDelete }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="bf-i-ph-trash btn-ghost">Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <AlertDialog.Content
          className="fixed z-50
                w-[95vw] max-w-md rounded-lg p-4 md:w-full 
                top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                bg-gray2 space-y-6"
        >
          <AlertDialog.Title className="fw-700">Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            Deleting is permanent and cannot be undone.
            <br />
          </AlertDialog.Description>
          <div className="flex gap-4 justify-end">
            <AlertDialog.Cancel asChild>
              <button className="btn">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="btn-danger" onClick={handleDelete}>
                Yes, delete this record
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
