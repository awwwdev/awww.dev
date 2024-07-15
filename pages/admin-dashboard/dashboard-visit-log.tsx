import { TableR } from "@/components/Table";
import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

import { ColumnDef } from "@tanstack/table-core";
import { getFullName } from "@/utils/formatter";
import useAdminAccess from "@/hooks/useAdminAccess";

const AdminDash = () => {
  const hasVisitLogsAccess = useAdminAccess("hasVisitLogsAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const logQ = useQuery({
    queryKey: ["dashboardVisitLogAdminDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("dashboardVisitLog").select(`*, user (firstname, lastname)`);
      if (error) throw error;
      return data;
    },
  });

  const usersQ = useQuery({
    queryKey: ["usersDashboardVisitLog-1"],
    enabled: logQ.isSuccess,
    queryFn: async () => {
      const userIds = new Set(logQ.data.map((log) => log.userId));
      const { data: users, error: usersError } = await supabase.from("user").select(`*`);
      if (usersError) throw usersError;

      const { data: students, error: studentsError } = await supabase.from("student").select("id");
      if (studentsError) throw studentsError;

      const studentIds = new Set(students.map((student) => student.id));

      return users.filter((user) => !userIds.has(user.id) && !studentIds.has(user.id));
    },
  });

  const payersQ = useQuery({
    queryKey: ["payersDashboardVisitLog-1"],
    enabled: logQ.isSuccess,
    queryFn: async () => {
      const userIds = new Set(logQ.data.map((log) => log.userId));
      const { data: payers, error: payersError } = await supabase.from("payer").select(`*, user (firstname, lastname)`);
      if (payersError) throw payersError;

      return payers.filter((payer) => !userIds.has(payer.id));
    },
  });

  const adminsQ = useQuery({
    queryKey: ["adminsDashboardVisitLog-1"],
    enabled: logQ.isSuccess,
    queryFn: async () => {
      const userIds = new Set(logQ.data.map((log) => log.userId));
      const { data: admins, error: adminsError } = await supabase.from("admin").select(`*, user (firstname, lastname)`);
      if (adminsError) throw adminsError;

      return admins.filter((admin) => !userIds.has(admin.id));
    },
  });

  const teachersQ = useQuery({
    queryKey: ["teachersDashboardVisitLog-1"],
    enabled: logQ.isSuccess,
    queryFn: async () => {
      const userIds = new Set(logQ.data.map((log) => log.userId));
      const { data: teachers, error: teachersError } = await supabase
        .from("teacher")
        .select(`*, user (firstname, lastname)`);
      if (teachersError) throw teachersError;

      return teachers.filter((teacher) => !userIds.has(teacher.id));
    },
  });

  if (!hasVisitLogsAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div>
      <h2 className="H1">
        Active
        <span className="fw-300"> Users</span>
      </h2>
      {renderNoData(logQ) ?? renderNoData(payersQ) ?? renderNoData(teachersQ) ?? renderNoData(adminsQ) ?? (
        <>
          <TableR pageId={pageId}>
            {logQ.data.map((log) => {
              const row = {};
              row["Name"] = getFullName(log.user);
              row["Logged in at"] = new Date(log.created_at);
              return row;
            })}
          </TableR>
          <h2 className="H1">
            Passive
            <span className="fw-300"> Payers</span>
          </h2>
          <TableR pageId={pageId}>
            {payersQ.data.map((payer) => {
              const row = {};
              row["Name"] = getFullName(payer.user);
              row["ID"] = payer.id;
              return row;
            })}
          </TableR>
          <h2 className="H1">
            Passive
            <span className="fw-300"> Teachers</span>
          </h2>
          <TableR pageId={pageId}>
            {teachersQ.data.map((payer) => {
              const row = {};
              row["Name"] = getFullName(payer.user);
              row["ID"] = payer.id;
              return row;
            })}
          </TableR>
          <h2 className="H1">
            Passive
            <span className="fw-300"> Admins</span>
          </h2>
          <TableR pageId={pageId}>
            {adminsQ.data.map((payer) => {
              const row = {};
              row["Name"] = getFullName(payer.user);
              row["ID"] = payer.id;
              return row;
            })}
          </TableR>
        </>
      )}
    </div>
  );
};

export default AdminDash;
