import { NavLink } from "./Lnk";

const TeacherDashLayout = () => {
  const baseHref = "/teacher-dashboard";
  return (
    <nav aria-label="secondary" className="flex gap-2 flex-wrap capitalize text-xs">
      <NavLink baseHref={baseHref} page="courses" icon="bf-i-ph-book-bookmark" />
      <NavLink baseHref={baseHref} page="sessions" icon="bf-i-ph-chalkboard-teacher" />
      {/*       <NavLink baseHref={baseHref} page="sessions-by-month" icon="bf-i-ph-chalkboard-teacher" /> */}
      <NavLink baseHref={baseHref} page="payments" icon="bf-i-ph-receipt" />
    </nav>
  );
};

export default TeacherDashLayout;
