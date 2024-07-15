import { NavLink } from "./Lnk";

const UsersLayout = () => {
  const baseHref = "/admin-dashboard/users";
  return (
    <nav aria-label="user management" className="flex gap-2 flex-wrap text-xs">
      <NavLink baseHref={baseHref} page="" label="View all Users" icon="bf-i-ph-users-three" />
      <NavLink baseHref={baseHref} page="add-user" label="Add a New User" icon="bf-i-ph-user-circle-plus" />
      <NavLink baseHref={baseHref} page="add-teacher" label="Add a New Teacher" icon="bf-i-ph-chalkboard-teacher" />
      <NavLink baseHref={baseHref} page="add-payer" label="Add a New Payer" icon="bf-i-ph-users" />
      <NavLink baseHref={baseHref} page="add-student" label="Add a New Student" icon="bf-i-ph-student" />
    </nav>
  );
};

export default UsersLayout;
