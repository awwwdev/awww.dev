import { useState } from "react";
import AddUserForm from "@/components/forms/AddUserForm";
import { getFullName, getFullNameFa, getUserRoles } from "@/utils/formatter";
import useAdminAccess from "@/hooks/useAdminAccess";

export default function Page() {
  const hasUserManagementAccess = useAdminAccess("hasUserManagementAccess");
  const [registeredUser, setRegisteredUser] = useState(null);

  if (!hasUserManagementAccess) return <p>You don&apos;t have access to this page</p>;

  if (registeredUser) {
    return <SuccessScreen registeredUser={registeredUser} />;
  }
  return (
    <>
      <h1 className="H1">Add a New User</h1>
      <AddUserForm setRegisteredUser={setRegisteredUser} registeredUser={registeredUser} />
    </>
  );
}

const SuccessScreen = ({ registeredUser }) => {
  return (
    <section className="space-y-6">
      <p className="snack-success">User is added successfully</p>
      <h2>Added User:</h2>
      <div className="text-tiny-note b-2 b-gray6 bg-gray2 b-dashed p-4 rd-xl">
        <p>Name: {getFullName(registeredUser)} </p>
        <p>Name in Farsi: {getFullNameFa(registeredUser)}</p>
        <p>Email: {registeredUser?.email}</p>
        <p>Phone: {registeredUser?.phone}</p>
        <p>ID in database: {registeredUser?.id}</p>
        <p>Current Roles: {getUserRoles(registeredUser)}</p>
      </div>
    </section>
  );
};
