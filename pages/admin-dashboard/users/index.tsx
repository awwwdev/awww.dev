import Icon from "@/components/ui/Icon";
import { renderNoData } from "@/components/RenderQ";
import { TableR } from "@/components/Table";
import useAdminAccess from "@/hooks/useAdminAccess";
import useGetR from "@/hooks/useGetR";
import { Database } from "@/supabase/db_types";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/table-core";
import Link from "next/link";

type UserType = User & { admin?: Admin; payer?: Payer; teacher?: Teacher; student?: Student };

const schema: ColumnDef<any, any>[] = [
  {
    id: "edit",
    header: "Edit Records",
    cell: (info) => {
      return info.getValue ? (
        <Link
          href={`/admin-dashboard/users/${info.row.getValue("id")}/edit`}
          className="flex ac jc gap-1 c-blue11 text-sm"
        >
          <Icon name="i-ph-note-pencil-light" className="shrink-0 " />
          Edit User Info
        </Link>
      ) : null;
    },
  },
];

const AdminDash = () => {
  const hasUserManagementAccess = useAdminAccess("hasUserManagementAccess");
  const pageId = window.location.pathname;
  const supabase = useSupabaseClient();
  const userQ = useQuery<UserType, Error>({
    queryKey: ["manage-users-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user").select(`* ,
       teacher (*, user (*)),
       admin (* , user (*)),
       student (* , user (*)),
       payer (* , user (*))
     `);
      if (error) throw error;
      return data;
    },
  });

  if (!hasUserManagementAccess) return <p>You don&apos;t have access to this page</p>;
  return (
    <div className="space-y-8">
      <h1 className="H1">All Users</h1>
      {renderNoData(userQ) ?? (
        <TableR schema={schema} pageId={pageId}>
          {userQ.data.map((user) => {
            const row = {};
            row["email"] = user.email;
            row["Full Name"] = getFullName(user);
            row["Farsi Full Name"] = getFullNameFa(user);
            row["phone"] = user.phone;
            let roles = [];
            if (user.admin?.id) roles.push("admin");
            if (user.teacher?.id) roles.push("teacher");
            if (user.payer?.id) roles.push("payer");
            if (user.student?.id) roles.push("student");
            row["roles"] = roles.join(" ,");
            row["edit"] = user.id;
            row["id"] = user.id;
            return row;
          })}
        </TableR>
      )}
    </div>
  );
};

export default AdminDash;
