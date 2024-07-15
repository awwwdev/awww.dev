import { useState } from "react";
import AddTeacherForm from "@/components/forms/AddTeacherForm";
import useGetUsers from "@/hooks/useGetUsers";
import { renderNoData } from "@/components/RenderQ";
import Icon from "@/components/ui/Icon";
import * as Tabs from "@radix-ui/react-tabs";
import AddUserForm from "@/components/forms/AddUserForm";
import { getFullName, getFullNameFa, getUserRoles } from "@/utils/formatter";
import useGetR from "@/hooks/useGetR";
import UserSelector from "@/components/UserSelect";

export default function Page() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [registeredTeacher, setRegisteredTeacher] = useState(null);

  if (selectedUser && registeredTeacher) {
    return <SuccessScreen selectedUser={selectedUser} registeredTeacher={registeredTeacher} />;
  }
  return (
    <>
      <h1 className="H1">Add a New Teacher</h1>
      <ol className="space-y-8 mis-8 b-l-1 pis-8 ">
        <li
          className={`space-y-4 rd-xl p-4 b-1 b-gray5 rel before:content-1 before:w-10 before:h-10 before:absolute before:-left-13.5 before:p-4 before:rounded-full before:bg-gray8 before:c-gray1 before:fw-900 before:text-xl before:flex before:ac before:jc  ${
            !selectedUser && "!before:bg-blue10 !b-blue7"
          }`}
        >
          <h2 className="H3 c-gray10">Select/Create a User</h2>
          <Tabs.Root className="space-y-4" defaultValue="current-user">
            <Tabs.List className="flex justify-stretch  gap-4  rd-xl fw-700 ">
              <Tabs.Trigger
                value="current-user"
                className="flex-1 l  p-4 rd-xl  c-gray10 bg-gray3 hover:bg-gray4 data-[state=active]:c-orange11 data-[state=active]:!bg-orange4 "
              >
                From a Existing Non-Teacher User
              </Tabs.Trigger>
              <Tabs.Trigger
                value="create-user"
                className="flex-1   p-4 rd-xl  c-gray10 bg-gray3  hover:bg-gray4 data-[state=active]:c-orange11 data-[state=active]:!bg-orange4 "
              >
                Create a New User
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="current-user" className="space-y-4">
              <label>
                <span className="fw-700">Select a user</span>
                <UserSelector filterUserList={(user) => !user.teacher} user={selectedUser} setUser={setSelectedUser} />
              </label>
            </Tabs.Content>
            <Tabs.Content value="create-user" className="space-y-4">
              <span className="fw-700">Create a new by filling the form below</span>
              <AddUserForm setRegisteredUser={setSelectedUser} registeredUser={selectedUser} userType="teacher" />
            </Tabs.Content>
          </Tabs.Root>
          <ShowUserInfo user={selectedUser} />
        </li>
        <li
          className={`space-y-4 rd-xl p-4 b-1 b-gray5 rel before:content-2 before:absolute before:-left-13.5  before:w-10 before:h-10 before:rounded-full before:bg-gray8 before:c-gray1 before:fw-900 before:text-xl before:flex before:ac before:jc  ${
            selectedUser && "!before:bg-blue10 !b-blue7"
          }`}
        >
          <h2 className={`H3 c-gray10`}>Make it a teacher</h2>
          <>
            {!selectedUser && <p className="info-line">Please complete Step 1 first. </p>}
            {selectedUser && <AddTeacherForm user={selectedUser} setRegisteredTeacher={setRegisteredTeacher} />}
          </>
        </li>
      </ol>
    </>
  );
}

const SuccessScreen = ({ registeredTeacher, selectedUser }) => {
  return (
    <section className="space-y-6">
      <p className="snack-success">Teacher is added successfully</p>
      <h2>Added Teacher:</h2>
      <div className="text-tiny-note b-2 b-gray6 bg-gray2 b-dashed p-4 rd-xl">
        <p className="fw-700">Selected User:</p>
        <p>Name: {getFullName(selectedUser)}</p>
        <p>Name in Farsi: {getFullNameFa(selectedUser)}</p>
        <p>Email: {selectedUser?.email}</p>
        <p>Phone: {selectedUser?.phone}</p>
        <p>ID in database: {selectedUser?.id}</p>
        <p>Current Roles: {getUserRoles(selectedUser)}</p>
        <hr />
        <h3>Teacher Profile</h3>
        <p>idInSheet: {registeredTeacher?.idInSheet}</p>
        <p>English Fluency: {registeredTeacher?.englishFluency}</p>
        <p>paymentDetails: {registeredTeacher?.paymentDetails}</p>
        <p>paymentDetailsFirst: {registeredTeacher?.paymentDetailsFirst}</p>
        <p>paymentDetailsSecond: {registeredTeacher?.paymentDetailsSecond}</p>
        <p>profileLink: {registeredTeacher?.profileLink}</p>
        <p>paymentMethod: {registeredTeacher?.paymentMethod}</p>
        <p>isActive: {registeredTeacher?.isActive.toString()}</p>
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
