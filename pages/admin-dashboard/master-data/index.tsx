import useAdminAccess from '@/hooks/useAdminAccess';

export default function Page() {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;
  return (
    <div className="space-y-6">
      <p>Click on the different links to see the data</p>
    </div>
  );
}
