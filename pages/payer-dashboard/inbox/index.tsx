import { NavLink } from "@/components/layouts/Lnk";

const Inbox = () => {

  return (
    <>
      <h1 className="H1">Inbox</h1>
      <nav aria-label="by teacher reports" className="flex gap-2 flex-wrap text-xs border-t py-4">
        <NavLink baseHref="/payer-dashboard/inbox" page="intro-meeting" />
        <NavLink baseHref="/payer-dashboard/inbox" page="unpaid-session" />
        <NavLink baseHref="/payer-dashboard/inbox" page="end-of-package" />
      </nav>
      <div>
        <p className='info-line text-sm'>Click on the links above to see your messages</p>
      </div>
    </>
  );
};

export default Inbox;
