import { useState } from "react";
import AddPayerForm from "@/components/forms/AddPayerForm";
import UserSelector from "@/components/UserSelect";
import { getFullName, getFullNameFa, getUserRoles } from "@/utils/formatter";
import * as Tabs from "@radix-ui/react-tabs";
import AddUserForm from "@/components/forms/AddUserForm";

export default function Page() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [registeredPayer, setRegisteredPayer] = useState(null);

  if (selectedUser && registeredPayer) {
    return <SuccessScreen selectedUser={selectedUser} registeredPayer={registeredPayer} />;
  }

  const beforeStyles =
    "before:absolute before:-left-13.5  before:w-10 before:h-10 before:rounded-full before:bg-gray8 before:c-gray1 before:fw-900 before:text-xl before:flex before:ac before:jc";
  return (
    <>
      <h1 className="H1">Add a New Payer</h1>
      <ol className="space-y-8 mis-8 b-l-1 pis-8">
        <li
          className={`space-y-4 rd-xl p-4 b-1 b-gray5 rel before:content-1 ${beforeStyles} ${
            !selectedUser && "!before:bg-blue10 !b-blue7"
          }`}
        >
          <h2 className="H3 c-gray10">Select/Create a User</h2>
          <Tabs.Root className="space-y-4" defaultValue="current-user">
            <Tabs.List className="flex justify-stretch  gap-4  rd-xl fw-700 ">
              <Tabs.Trigger
                value="current-user"
                className="flex-1 l  p-4 rd-xl  c-gray10 bg-gray3 hover:bg-gray4 data-[state=active]:c-accent11 data-[state=active]:!bg-accent4 ) "
              >
                From a Existing Non-Payer User
              </Tabs.Trigger>
              <Tabs.Trigger
                value="create-user"
                className="flex-1   p-4 rd-xl  c-gray10 bg-gray3  hover:bg-gray4 data-[state=active]:c-accent11 data-[state=active]:!bg-accent4 "
              >
                Create a New User
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="current-user" className="space-y-4">
              <label>
                <span className="fw-700">Select a user</span>
                <UserSelector filterUserList={(user) => !user.payer} user={selectedUser} setUser={setSelectedUser} />
              </label>
            </Tabs.Content>
            <Tabs.Content value="create-user" className="space-y-4">
              <span className="fw-700">Create a new user by filling the form below</span>
              <AddUserForm setRegisteredUser={setSelectedUser} registeredUser={selectedUser} userType="payer" />
            </Tabs.Content>
          </Tabs.Root>
          <ShowUserInfo user={selectedUser} />
        </li>
        <li
          className={`space-y-4 rd-xl p-4 b-1 b-gray5 rel before:content-2 ${beforeStyles}  ${
            selectedUser && "!before:bg-blue10 !b-blue7"
          }`}
        >
          <h2 className={`H3 c-gray10`}>Make it a payer</h2>
          <>
            {!selectedUser && <p className="info-line">Please complete Step 1 first. </p>}
            {selectedUser && <AddPayerForm user={selectedUser} setRegisteredPayer={setRegisteredPayer} />}
          </>
        </li>
      </ol>
    </>
  );
}

const SuccessScreen = ({ registeredPayer, selectedUser }) => {
  return (
    <section className="space-y-6">
      <p className="snack-success">Payer is added successfully</p>
      <h2>Added Payer:</h2>
      <div className="text-tiny-note b-2 b-gray6 bg-gray2 b-dashed p-4 rd-xl">
        <p className="fw-700">Selected User:</p>
        <p>Name: {getFullName(selectedUser)}</p>
        <p>Name in Farsi: {getFullNameFa(selectedUser)}</p>
        <p>Email: {selectedUser?.email}</p>
        <p>Phone: {selectedUser?.phone}</p>
        <p>ID in database: {selectedUser?.id}</p>
        <p>Current Roles: {getUserRoles(selectedUser)}</p>
        <hr />
        <h3>Payer Profile</h3>
        <p>idInStudentSheet: {registeredPayer?.idInStudentSheet}</p>
        <p>dashboardLink: {registeredPayer?.dashboardLink}</p>
        <p>English Fluency: {registeredPayer?.howLearnedAboutUs}</p>
        <p>secondPayerName: {registeredPayer?.secondPayerName}</p>
      </div>
    </section>
  );
};

const ShowUserInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <div className="text-tiny-note b-2 b-gray6 bg-gray2 b-dashed p-4 rd-xl">
        <p className="fw-700">Selected User:</p>
        <p>
          Name: {user?.firstname} {user?.lastname}
        </p>
        <p>
          Name in Farsi: {user?.firstnameFa} {user?.lastnameFa}
        </p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        <p>ID in database: {user?.id}</p>
        <p>
          Current Roles:{" "}
          {`${user?.student ? "Student" : ""} ${user?.payer ? "Payer" : ""} ${user?.teacher ? "Teacher" : ""} ${
            user?.admin ? "Admin" : ""
          }`.replace(" ", ", ")}
        </p>
      </div>
    </div>
  );
};
