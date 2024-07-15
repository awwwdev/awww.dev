import { NavLink } from "./Lnk";

const NavBar = ({ baseHref = "/admin-dashboard/reports/by-teacher" }) => {
  return (
    <nav aria-label="by teacher reports" className="flex gap-2 flex-wrap text-xs border-t py-4">
      <NavLink baseHref={baseHref} page="session" />
      <NavLink baseHref={baseHref} page="new-course" />
      <NavLink baseHref={baseHref} page="average-session-cost" />
      <NavLink baseHref={baseHref} page="new-enrollments" />
      <NavLink baseHref={baseHref} page="retention-rate" />
    </nav>
  );
};

export default NavBar;
