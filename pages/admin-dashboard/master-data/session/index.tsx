import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName } from "@/utils/formatter";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ColumnDef } from "@tanstack/table-core";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const sessionQ = useQuery({
    queryKey: ["sessionMasterData-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          `id, idInSheet, date, isHeld, course(idInSheet,courseStudent(student(user(firstname, lastname))), teacher(user(firstname, lastname)))`
        )
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const schema: ColumnDef<any, any>[] = [
    {
      id: "Edit Records",
      header: "Edit Records",
      cell: (info) => {
        return info.getValue ? (
          <Link
            href={`/admin-dashboard/master-data/session/${info.row.getValue("Session ID")}`}
            className="flex ac jc gap-1 c-blue11 text-sm"
          >
            <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
            Edit
          </Link>
        ) : null;
      },
    },
  ];

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <div className="rd-xl b-1 b-gray-6 bg-gray1 p-4 flex justify-end gap-6 ac">
        <Link href="/admin-dashboard/master-data/session/add" className="btn-accent bf-i-ph-plus inline-block">
          Add a new record
        </Link>
      </div>
      {renderNoData(sessionQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {sessionQ.data.map((se) => {
            const row = {};
            row["Session ID"] = se.id;
            row["Session ID in Sheet"] = se.idInSheet;
            row["Course ID in Sheet"] = se.course.idInSheet;
            row["Date"] = new Date(se.date);
            row["Teacher Name"] = getFullName(se.course.teacher.user);
            row["Students"] = se.course.courseStudent.map((cs) => getFullName(cs.student.user)).join(", ");
            row["Was Session Held"] = se.isHeld;
            row["Edit Records"] = "";
            return row;
          })}
        </TableR>
      )}
    </div>
  );
};

export default AdminDash;
