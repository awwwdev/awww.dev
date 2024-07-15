import useGetUserMe from "@/hooks/useGetUserMe";

type AccessType =
  | "hasBlogManagementAccess"
  | "hasUserManagementAccess"
  | "hasMasterDataAccess"
  | "hasReportsAccess"
  | "hasVisitLogsAccess"
  | "hasAccessManagementAccess";

const useAdminAccess = (access: AccessType) => {
  const userMeQ = useGetUserMe();
  const hasAccess = userMeQ.data && userMeQ.data.admin[access];

  return hasAccess;
};

export default useAdminAccess;
