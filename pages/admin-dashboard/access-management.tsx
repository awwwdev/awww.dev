import { renderNoData } from "@/components/RenderQ";
import Switch from '@/components/ui/Switch';
import useAdminAccess from '@/hooks/useAdminAccess';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AccessManagement = () => {
  const hasAccessManagementAccess = useAdminAccess("hasAccessManagementAccess");
  const supabase = useSupabaseClient();
    const queryClient = useQueryClient();
  const adminQ = useQuery({
    queryKey: ["adminAdminDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin").select(`*, user (firstname, lastname)`);
      if (error) throw error;
      return data;
    },
  });

  const handleToggle = async (adminId, accessField, currentAccess) => {
    const { error } = await supabase
      .from("admin")
      .update({ [accessField]: !currentAccess })
      .eq("id", adminId);

    if (error) {
      console.error("Failed to update access:", error);
    } else {
      queryClient.invalidateQueries({ queryKey: ["adminAdminDash-1"] });
    }
  };

  if (!hasAccessManagementAccess) return <p>You don&apos;t have access to this page.</p>

  return (
    <div>
      <h1 className="H1">Access Management</h1>
      {renderNoData(adminQ) ??
        adminQ.data.map((admin) => {
          return (
            <div key={admin.id} className="bg-white border rounded p-4 my-2">
              <h2 className="font-bold mb-2">
                {admin.user.firstname} {admin.user.lastname}
              </h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-4">
                  <Switch
                    checked={admin.hasUserManagementAccess}
                    onCheckedChange={() =>
                      handleToggle(admin.id, "hasUserManagementAccess", admin.hasUserManagementAccess)
                    }
                  />
                  <span>User Management Access</span>
                </label>
                <label className="flex items-center gap-4">
                  <Switch
                    checked={admin.hasMasterDataAccess}
                    onCheckedChange={() => handleToggle(admin.id, "hasMasterDataAccess", admin.hasMasterDataAccess)}
                  />
                  <span>Master Data Access</span>
                </label>
                <label className="flex items-center gap-4">
                  <Switch
                    checked={admin.hasReportsAccess}
                    onCheckedChange={() => handleToggle(admin.id, "hasReportsAccess", admin.hasReportsAccess)}
                  />
                  <span>Reports Access</span>
                </label>
                <label className="flex items-center gap-4">
                  <Switch
                    checked={admin.hasVisitLogsAccess}
                    onCheckedChange={() => handleToggle(admin.id, "hasVisitLogsAccess", admin.hasVisitLogsAccess)}
                  />
                  <span>Visit Logs Access</span>
                </label>
                <label className="flex items-center gap-4">
                  <Switch
                    checked={admin.hasBlogManagementAccess}
                    onCheckedChange={() =>
                      handleToggle(admin.id, "hasBlogManagementAccess", admin.hasBlogManagementAccess)
                    }
                  />
                  <span>Blog Management Access</span>
                </label>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AccessManagement;
