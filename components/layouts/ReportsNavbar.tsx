import { NavLink } from "./Lnk";

const ReportsLayout = () => {
  const baseHref = "/admin-dashboard/reports";
  return (
    <nav aria-label="reports" className="flex gap-2  flex-wrap text-xs">
      <NavLink baseHref={baseHref} page="overall" icon="bf-i-ph-files" />
      <NavLink baseHref={baseHref} page="by-category" icon="bf-i-ph-squares-four" />
      <NavLink baseHref={baseHref} page="by-teacher" icon="bf-i-ph-chalkboard-teacher" />
      <NavLink baseHref={baseHref} page="payment-by-payer" icon="bf-i-ph-credit-card" />
      <NavLink baseHref={baseHref} page="payment-to-teacher" icon="bf-i-ph-receipt" />
    </nav>
  );
};

export default ReportsLayout;
