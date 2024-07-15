import useGetUserMe from "@/hooks/useGetUserMe";
import useLogOut from "@/hooks/useLogOut";
import useRouteType from "@/hooks/useRouteType";
import Lnk from "@/components/Lnk";
import { useTimeZone } from "./TimeZoneProvider";
import Link from "next/link";
import useNewIntroMeetingMail from "@/hooks/useNewIntroMeetingMail";
import useSessionInTeacherInbox from "@/hooks/useSessionInTeacherInbox";
import useIntroMeetingMail from "@/hooks/useIntroMeetingMail";
import useUnpaidSessionMail from "@/hooks/useUnpaidSessionMail";
import useDashboardGeneralMail from "@/hooks/useDashboardGeneralMail";
import darsoonLogo from "@/public/static/logo/darsoon-logo.png";
import darsoonLogoIcon from "@/public/static/logo/darsoon-logo-icon.png";
import Image from "next/image";
import * as Toggle from "@radix-ui/react-toggle";
import { createContext, useContext, useState } from "react";
import useAdminAccess from "@/hooks/useAdminAccess";
import MobileOnly from "./ui/MobileOnly";
import useLocaleSwitcher from "@/hooks/useLocaleSwitcher";
import { En, Fa } from "./ui/multilang";
import DesktopOnly from "./ui/DesktopOnly";
import Button from "./ui/button";
import Icon from "@/components/ui/Icon";

const NavContext = createContext({ isCollapsed: false, setIsCollapsed: () => {} });

export default function SideMenu({ isSideMenuOpen, setIsSideMenuOpen, isInDashboard }) {
  return (
    <>
      <MobileSideMenuOverlay {...{ isSideMenuOpen, setIsSideMenuOpen }} />
      <div
        className={`${isInDashboard ? "grid" : "sm:display-none"} aside w-sidebar bg-gray2 z-30 h-full  ${
          isSideMenuOpen && "drawer-open"
        }`}
      >
        <SideNav
          className={`${isInDashboard ? "grid" : "sm:display-none"} text-sm  bg-white shd-titned-3  h-full`}
          isInDashboard={isInDashboard}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
      </div>
    </>
  );
}

const MobileSideMenuOverlay = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
  return (
    <div
      className={` drawer-overlay sm:display-none fixed z-20 inset-0 bg-blackA-2 
             transition-opacity duration-600 ease-in-out backdrop-blur-4
             ${isSideMenuOpen ? "opacity-100 select-none" : "pointer-events-none opacity-0 "}`}
      title="Close Menu"
      aria-label="Close Menu"
      onClick={() => setIsSideMenuOpen(false)}
    >
      <span className="sr-only">Close Menu</span>
    </div>
  );
};

function SideNav({ className, isInDashboard, setIsSideMenuOpen }) {
  const userMeQ = useGetUserMe();
  const routeType = useRouteType();

  const [isCollapsed, _setIsCollapsed] = useState(false);

  const setIsCollapsed = (v) => {
    document.documentElement.style.setProperty("--sidebar-width", v ? "4rem" : "14.5rem");
    _setIsCollapsed(v);
  };

  const { handleLocaleChange } = useLocaleSwitcher();
  return (
    <NavContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <nav aria-label="primary" className={className} style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
        <DesktopOnly>
          <div className="flex items-center h-16bg-blackA-11 px-4 sticky top-0 z-10">
            <Logo isInDashboard={isInDashboard} isCollapsed={isCollapsed} />
          </div>
        </DesktopOnly>
        <MobileOnly>
          <div className="flex">
            <Button
              variation="text"
              width='content'
              className='!rd-full'
              iconButton
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
            >
              <Icon name="bf-i-ph-x" subdued={false} />
            </Button>
          </div>
        </MobileOnly>
        <div className="p-4 flex flex-col gap-6 sm:gap-3  ">
          {userMeQ.data?.isAdmin && isInDashboard && <AdminNav />}
          {userMeQ.data?.isPayer && isInDashboard && <PayerNav />}
          {userMeQ.data?.isTeacher && isInDashboard && <TeacherNav />}
          <PublicWebsiteNav />
          <div className="mt-auto"></div>
          <div className="flex flex-col gap-6 sm:gap-3 mt-auto">
            <div className=" b-b-1 b-gray5"></div>
            <div className="h-1"></div>
            {userMeQ.data && (
              <NavLink
                href="/account"
                className="data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 ) bf-i-ph-user-circle"
              >
                {userMeQ.data.firstname}
              </NavLink>
            )}
            <NavLink
              href="/report-bug"
              className="data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 ) bf-i-ph-bug"
            >
              Report Bug
            </NavLink>
            <div className="grid gap-6 sm:gap-3">
              <LoginInButton user={userMeQ.data} isCollapsed={isCollapsed} />
              <MobileOnly>
                <button className="w-fit" onClick={() => handleLocaleChange()}>
                  <Icon name="bf-i-ph-globe mie-2" />
                  <Fa>English</Fa>
                  <En>فارسی</En>
                </button>
              </MobileOnly>
            </div>
            <CollapseToggle isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
        </div>
      </nav>
    </NavContext.Provider>
  );
}

function Logo({ isInDashboard, isCollapsed }) {
  return (
    <Link href="/" className="fw-300 leading-0 ">
      {isCollapsed ? (
        <Image src={darsoonLogoIcon} alt="Darsoon" className="max-w-6" />
      ) : (
        <Image src={darsoonLogo} alt="Darsoon" className="max-w-20" />
      )}
      {isInDashboard && !isCollapsed && <span className="text-sm tracking-widest ">Dashboard</span>}
    </Link>
  );
}

function CollapseToggle({ isCollapsed, setIsCollapsed }) {
  return (
    <div className="display-none sm:block  -mis-1.5">
      <Toggle.Root
        pressed={isCollapsed}
        onPressedChange={(v) => setIsCollapsed(v)}
        aria-label="Toggle italic"
        className={`bg-sand3
          hover:bg-sand4
      data-[state=on]:bg-sand3  
       flex h-6 w-6  items-center justify-center rounded b-1 b-sand3  leading-4 `}
      >
        <span className={"sr-only"}>Callpase Side Nav</span>
        {isCollapsed ? <Icon name="bf-i-ph-caret-right" /> : <Icon name="bf-i-ph-caret-left" />}
      </Toggle.Root>
    </div>
  );
}

function NavLink({ href, className, children }) {
  const { isCollapsed } = useContext(NavContext);
  return (
    <Lnk href={href} className={className}>
      <span className={`${isCollapsed ? "sr-only" : ""}`}>{children}</span>
    </Lnk>
  );
}

function PublicWebsiteNav() {
  return (
    <>
      <div className="h-2"></div>
      <NavLink
        href={``}
        className=" text-xs data-[in-path=true]:c-prm11 before:m-0 flex gap-2 ac c-sand11  after:content-none after:flex-1 after:h-1px after:bg-gray6  "
      >
        Darsoon Website
      </NavLink>
      <NavLink
        href="/tutors"
        className="bf-i-ph-chalkboard-simple data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Classes
      </NavLink>
      <NavLink
        href="/process"
        className="bf-i-ph-traffic-sign  data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        How it Works
      </NavLink>
      <NavLink
        href="/faq"
        className="bf-i-ph-question data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        FAQ{" "}
      </NavLink>
   
      <NavLink
        href="/blog"
        className="bf-i-ph-newspaper data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Blog
      </NavLink>
      <NavLink
        href="/contact"
        className="bf-i-ph-phone data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
        target="_blank"
      >
        Contact Us
      </NavLink>
    </>
  );
}

const LoginInButton = ({ user, isCollapsed }) => {
  const logoutM = useLogOut();
  const userMeQ = useGetUserMe();

  if (userMeQ.data)
    return (
      <button onClick={() => logoutM.mutate()} className="text-start  bf-i-ph-sign-out">
        <span className={`${isCollapsed ? "sr-only" : ""}`}>Logout</span>
      </button>
    );

  return (
    <NavLink href="/login" className="bf-i-ph-sign-in">
      <span className={`${isCollapsed ? "sr-only" : ""}`}>Login</span>
    </NavLink>
  );
};

const AdminNav = () => {
  const hasUserManagementAccess = useAdminAccess("hasUserManagementAccess");
  const hasBlogManagementAccess = useAdminAccess("hasBlogManagementAccess");
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const hasReportsAccess = useAdminAccess("hasReportsAccess");
  const hasVisitLogsAccess = useAdminAccess("hasVisitLogsAccess");
  const hasAccessManagementAccess = useAdminAccess("hasAccessManagementAccess");
  return (
    <>
      <NavLink
        href={`/admin-dashboard`}
        className=" text-xs data-[in-path=true]:c-prm11 before:m-0 flex gap-2 ac c-sand11  after:content-none after:flex-1 after:h-1px after:bg-gray6  "
      >
        Admin Dashboard
      </NavLink>
      {hasUserManagementAccess && (
        <NavLink
          href="/admin-dashboard/users"
          className="bf-i-ph-users-three data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          User Management
        </NavLink>
      )}
      {hasMasterDataAccess && (
        <NavLink
          href="/admin-dashboard/master-data"
          className="bf-i-ph-database data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          Master Data
        </NavLink>
      )}
      {hasReportsAccess && (
        <NavLink
          href="/admin-dashboard/reports"
          className="bf-i-ph-file-text data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          Reports
        </NavLink>
      )}
      {hasVisitLogsAccess && (
        <NavLink
          href="/admin-dashboard/dashboard-visit-log"
          className="bf-i-ph-scroll data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          Visit Logs
        </NavLink>
      )}
      {hasBlogManagementAccess && (
        <NavLink
          href="/admin-dashboard/blog"
          className="bf-i-ph-note-pencil data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          Blog Management
        </NavLink>
      )}
      {hasAccessManagementAccess && (
        <NavLink
          href="/admin-dashboard/access-management"
          className="bf-i-ph-person-simple data-[in-path=true]:(c-prm11 ) data-[in-sub-path=true]:(c-prm11 )"
        >
          Access Management
        </NavLink>
      )}
    </>
  );
};

const PayerNav = () => {
  const introMeetingMailQ = useIntroMeetingMail();
  const unpaidSessionMailQ = useUnpaidSessionMail();
  const dashboardGeneralMailQ = useDashboardGeneralMail();
  return (
    <>
      {/*       <NavLink
        href="/payer-dashboard/students"
        className="bf-i-ph-student data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Students
      </NavLink>
      <NavLink
        href="/payer-dashboard/courses"
        className="bf-i-ph-book-bookmark data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Courses
      </NavLink> */}
      <NavLink
        href="/payer-dashboard/courses"
        className="bf-i-ph-chalkboard data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Courses
      </NavLink>
      <NavLink
        href="/payer-dashboard/workshops"
        className="bf-i-ph-chalkboard-simple data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Workshops
      </NavLink>
      <NavLink
        href="/payer-dashboard/sessions"
        className="bf-i-ph-chalkboard-teacher data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Sessions
      </NavLink>
      <NavLink
        href="/payer-dashboard/packages"
        className="bf-i-ph-package data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Packages
      </NavLink>
      <NavLink
        href="/payer-dashboard/payments"
        className="bf-i-ph-wallet data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Payments
      </NavLink>
      <NavLink
        href="/payer-dashboard/add-course-feedback"
        className="bf-i-ph-star data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Add Course Feedback
      </NavLink>
      <NavLink
        href="/payer-dashboard/inbox"
        className="bf-i-ph-tray data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Inbox{" "}
        {introMeetingMailQ.isSuccess &&
          unpaidSessionMailQ.isSuccess &&
          dashboardGeneralMailQ.isSuccess &&
          introMeetingMailQ.data.length + unpaidSessionMailQ.data.length + dashboardGeneralMailQ.data.length > 0 && (
            <span className="">
              ({introMeetingMailQ.data.length + unpaidSessionMailQ.data.length + dashboardGeneralMailQ.data.length})
            </span>
          )}
      </NavLink>
    </>
  );
};
const TeacherNav = () => {
  const newIntroMeetingMailQ = useNewIntroMeetingMail();
  const sessionInTeacherInboxQ = useSessionInTeacherInbox();
  return (
    <>
      <div className="b-t-1 b-gray5 pt-4"></div>
      <NavLink
        href="/teacher-dashboard/class-requests"
        className="bf-i-ph-student data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Class Requests
      </NavLink>
      <NavLink
        href="/teacher-dashboard/add-session"
        className="bf-i-ph-student data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Add Session
      </NavLink>
      <NavLink
        href="/teacher-dashboard/payments"
        className="bf-i-ph-receipt data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Payments
      </NavLink>
      <NavLink
        href="/teacher-dashboard/inbox"
        className="bf-i-ph-tray data-[in-path=true]:(c-prm11 underline) data-[in-sub-path=true]:(c-prm11 underline)"
      >
        Inbox{" "}
        {newIntroMeetingMailQ.isSuccess &&
          sessionInTeacherInboxQ.isSuccess &&
          newIntroMeetingMailQ.data.length + sessionInTeacherInboxQ.data.length > 0 && (
            <span className="">({newIntroMeetingMailQ.data.length + sessionInTeacherInboxQ.data.length})</span>
          )}
      </NavLink>
    </>
  );
};

const TimeZoneSelect = () => {
  const { timeZone, setTimeZone, availableTimeZones } = useTimeZone();

  return (
    <label>
      TZ:{` `}
      <select className="field" value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
        {availableTimeZones.map((tz, i) => (
          <option key={i} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </label>
  );
};
