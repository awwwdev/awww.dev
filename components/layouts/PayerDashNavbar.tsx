import { NavLink } from "./Lnk";

const PayerDashLayout = () => {
  const baseHref = "/payer-dashboard";
  return (
    <nav aria-label="secondary" className="flex gap-2 flex-wrap capitalize text-xs">
      <NavLink baseHref={baseHref} page="students" icon="bf-i-ph-student" />
      <NavLink baseHref={baseHref} page="courses" icon="bf-i-ph-book-bookmark" />
      <NavLink baseHref={baseHref} page="sessions" icon="bf-i-ph-chalkboard-teacher" />
      <NavLink baseHref={baseHref} page="packages" icon="bf-i-ph-package" />
      <NavLink baseHref={baseHref} page="payments" icon="bf-i-ph-wallet" />
    </nav>
  );
};

export default PayerDashLayout;
