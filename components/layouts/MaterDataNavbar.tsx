import { NavLink } from "./Lnk";

const MasterDataLayout = () => {
  const baseHref = "/admin-dashboard/master-data";
  return (
    <nav aria-label="master data" className="flex gap-2 flex-wrap capitalize text-xs">
      <NavLink baseHref={baseHref} page="student" icon="bf-i-ph-student" />
      <NavLink baseHref={baseHref} page="payer" icon="bf-i-ph-users" />
      <NavLink baseHref={baseHref} page="teacher" icon="bf-i-ph-identification-card" />
      <NavLink baseHref={baseHref} page="topic" icon="bf-i-ph-football" />
      <NavLink baseHref={baseHref} page="expertise" icon="bf-i-ph-identification-card" />
      <NavLink baseHref={baseHref} page="course" icon="bf-i-ph-book-bookmark" />
      <NavLink baseHref={baseHref} page="package" icon="bf-i-ph-package" />
      <NavLink baseHref={baseHref} page="session" icon="bf-i-ph-chalkboard-teacher" />
      <NavLink baseHref={baseHref} page="feedback" icon="bf-i-ph-chat-centered-dots" />
      <NavLink baseHref={baseHref} page="payment-to-teacher" icon="bf-i-ph-receipt" />
      <NavLink baseHref={baseHref} page="payment-by-payer" icon="bf-i-ph-wallet" />
      <NavLink baseHref={baseHref} page="gift-for-teacher" icon="bf-i-ph-gift" />
      <NavLink baseHref={baseHref} page="currency-exchange-rate" icon="bf-i-ph-swap" />
      <NavLink baseHref={baseHref} page="promotion" icon="bf-i-ph-percent" />
    </nav>
  );
};

export default MasterDataLayout;
