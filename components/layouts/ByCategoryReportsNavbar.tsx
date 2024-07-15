import { NavLink } from "./Lnk";

const ByCategoryReportsLayout = () => {
  const baseHref = "/admin-dashboard/reports/by-category";
  return (
    <nav aria-label="by category reports" className="flex gap-2 flex-wrap text-xs border-t py-4">
      <NavLink baseHref={baseHref} page="completed-intros" />
      <NavLink baseHref={baseHref} page="new-courses" />
      <NavLink baseHref={baseHref} page="new-students" />
      <NavLink baseHref={baseHref} page="retention-rate" />
      <NavLink baseHref={baseHref} page="new-teachers" />
      <NavLink baseHref={baseHref} page="sessions" />
      <NavLink baseHref={baseHref} page="students-with-session" />
      <NavLink baseHref={baseHref} page="success-rate-for-intros" />
    </nav>
  );
};

export default ByCategoryReportsLayout;
