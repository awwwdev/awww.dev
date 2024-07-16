import { useState } from "react";
import AddStudentForm from "@/components/forms/AddStudentForm";
import UserSelector from "@/components/UserSelect";
import { getFullName, getFullNameFa, getUserRoles } from "@/utils/formatter";
import * as Tabs from "@radix-ui/react-tabs";
import AddUserForm from "@/components/forms/AddUserForm";
import Link from "next/link";

export default function Page() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPayerUser, setSelectedPayerUser] = useState(null);
  const [registeredStudent, setRegisteredStudent] = useState(null);

  if (selectedUser && selectedPayerUser && registeredStudent) {
    return (
      <SuccessScreen
        selectedUser={selectedUser}
        registeredStudent={registeredStudent}
        selectedPayerUser={selectedPayerUser}
      />
    );
  }

  const beforeStyles =
    "  before:absolute before:-left-13.5  before:w-10 before:h-10 before:rounded-full before:bg-gray8 before:c-gray1 before:fw-900 before:text-xl before:flex before:ac before:jc";

  return (
    <>
      <h1 className="H1">Add a New Student</h1>
      <div className="space-y-8 mis-8 b-l-1 pis-8">
        <section className={`space-y-4 p-4 b-1 b-gray6 rd-xl rel before:content-1 ${beforeStyles} `}>
          <h2 className={`H2`}>Step 1. Select a non-student user</h2>
          <Tabs.Root className="space-y-4" defaultValue="current-user">
            <Tabs.List className="flex justify-stretch  gap-4  rd-xl fw-700 ">
              <Tabs.Trigger
                value="current-user"
                className="flex-1 l  p-4 rd-xl  c-gray10 bg-gray3 hover:bg-gray4 data-[state=active]:c-accent11 data-[state=active]:!bg-accent4  "
              >
                From a Existing Non-Student User
              </Tabs.Trigger>
              <Tabs.Trigger
                value="create-user"
                className="flex-1   p-4 rd-xl  c-gray10 bg-gray3  hover:bg-gray4 data-[state=active]:c-accent11 data-[state=active]:!bg-accent4"
              >
                Create a New User
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="current-user" className="space-y-4">
              <label>
                <span className="fw-700">Select a user</span>
                <UserSelector filterUserList={(user) => !user.student} user={selectedUser} setUser={setSelectedUser} />
              </label>
            </Tabs.Content>
            <Tabs.Content value="create-user" className="space-y-4">
              <span className="fw-700">Create a new user by filling the form below</span>
              <AddUserForm setRegisteredUser={setSelectedUser} registeredUser={selectedUser} userType="student" />
            </Tabs.Content>
          </Tabs.Root>
        </section>
        <section className={`space-y-4 p-4 b-1 b-gray6 rd-xl rel before:content-2 ${beforeStyles}`}>
          <h2 className={`H2 ${!selectedUser && "c-gray10"}`}>Step 2. Select {`it's`} Payer </h2>
          <p className="info-line">
            This list only shows users who already have payer role. If your desired user is not in the list, you need to{" "}
            <Link href="/admin-dashboard/users/add-payer">make it a payer here</Link> and then redo the forms in this
            page.
          </p>
          <p className="info-line">The student user can be {`it's`} own parent, if it has a parent role. </p>
          <UserSelector
            filterUserList={(user) => user.payer?.id}
            user={selectedPayerUser}
            setUser={setSelectedPayerUser}
          />
        </section>
        <section className={`space-y-4 p-4 b-1 b-gray6 rd-xl rel before:content-3 ${beforeStyles}`}>
          <h2 className={`H2 ${!selectedUser && "c-gray10"}`}>Step 3. Make it a Student</h2>
          {!selectedUser && !selectedPayerUser && (
            <div>
              <p className="info-line">Please complete Step 1 and 2 first. </p>
            </div>
          )}
          {selectedUser && selectedPayerUser && (
            <AddStudentForm
              user={selectedUser}
              payerUser={selectedPayerUser}
              setRegisteredStudent={setRegisteredStudent}
            />
          )}
        </section>
      </div>
    </>
  );
}

const SuccessScreen = ({ registeredStudent, selectedUser, selectedPayerUser }) => {
  return (
    <section className="space-y-6">
      <h1 className="H1">Add a New Student</h1>
      <p className="snack-success">Student is added successfully</p>
      <h2>Added Student:</h2>
      <div className="text-tiny-note b-2 b-gray6 bg-gray2 b-dashed p-4 rd-xl">
        <p className="fw-700">Selected User:</p>
        <p>
          Name: {selectedUser?.firstname} {selectedUser?.lastname}
        </p>
        <p>
          Name in Farsi: {selectedUser?.firstnameFa} {selectedUser?.lastnameFa}
        </p>
        <p>Email: {selectedUser?.email}</p>
        <p>Phone: {selectedUser?.phone}</p>
        <p>ID in database: {selectedUser?.id}</p>
        <p>Current Roles: {getUserRoles(selectedUser)}</p>
        <hr />
        <p>Name: {getFullName(selectedPayerUser)}</p>
        <p>Name in Farsi: {getFullNameFa(selectedPayerUser)}</p>
        <p>Email: {selectedPayerUser?.email}</p>
        <p>Phone: {selectedPayerUser?.phone}</p>
        <p>ID in database: {selectedPayerUser?.id}</p>
        <h3>Payer of the Student Profile</h3>
        <p>idInStudentSheet: {selectedPayerUser?.payer?.idInStudentSheet}</p>
        <p>dashboardLink: {selectedPayerUser?.payer?.dashboardLink}</p>
        <p>howLearnedAboutUs: {selectedPayerUser?.payer?.howLearnedAboutUs}</p>
        <p>secondPayerName: {selectedPayerUser?.payer?.secondPayerName}</p>

        <hr />
        <h3>Student Profile</h3>
        <p>idInSheet: {registeredStudent?.idInSheet}</p>
        <p>yearOfBirth: {registeredStudent?.yearOfBirth}</p>
        <p>dateJoined: {registeredStudent?.dateJoined.toString()}</p>
        <p>secondPayerName: {registeredStudent?.secondPayerName}</p>
      </div>
    </section>
  );
};
