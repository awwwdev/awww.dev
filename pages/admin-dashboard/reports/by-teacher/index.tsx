import useAdminAccess from "@/hooks/useAdminAccess";

export default function Page() {
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  if (!hasReportsAccess) return <p>You don&apos;t have access to this page</p>;
  return <div></div>;
}
