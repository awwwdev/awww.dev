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

export default function SideMenu({ isSideMenuOpen, setIsSideMenuOpen }) {
  return (
    <>
      <MobileSideMenuOverlay {...{ isSideMenuOpen, setIsSideMenuOpen }} />
      <div
        className={` aside w-sidebar bg-gray2 z-30 h-full  ${
          isSideMenuOpen && "drawer-open"
        }`}
      >
        <SideNav
          className={` text-sm   shd-titned-3  h-full`}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
      </div>
    </>
  );
}

const MobileSideMenuOverlay = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
  return (
    <div
      className={` drawer-overlay sm:display-none fixed z-20 inset-0 bg-black2A 
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

function SideNav({ className, setIsSideMenuOpen }) {

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
          <div className="flex items-center h-16bg-black11A px-4 sticky top-0 z-10">
            <Logo  isCollapsed={isCollapsed} />
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
  
          <PublicWebsiteNav />
          <div className="mt-auto"></div>
          <div className="flex flex-col gap-6 sm:gap-3 mt-auto">
            <div className=" b-b-1 b-gray5"></div>
            <div className="h-1"></div>
         
            <NavLink
              href="/report-bug"
              className="data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 ) bf-i-ph-bug"
            >
              Report Bug
            </NavLink>
            <div className="grid gap-6 sm:gap-3">
              {/* <LoginInButton user={userMeQ.data} isCollapsed={isCollapsed} /> */}
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

function Logo({  isCollapsed }) {
  return (
    <Link href="/" className="fw-300 leading-0 ">
      {isCollapsed ? (
        <Image src={darsoonLogoIcon} alt="Darsoon" className="max-w-6" />
      ) : (
        <Image src={darsoonLogo} alt="Darsoon" className="max-w-20" />
      )}
      {!isCollapsed && <span className="text-sm tracking-widest ">Dashboard</span>}
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
        className=" text-xs data-[in-path=true]:c-accent11 before:m-0 flex gap-2 ac c-sand11  after:content-none after:flex-1 after:h-1px after:bg-gray6  "
      >
        Darsoon Website
      </NavLink>
      <NavLink
        href="/tutors"
        className="bf-i-ph-chalkboard-simple data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 underline)"
      >
        Classes
      </NavLink>
      <NavLink
        href="/process"
        className="bf-i-ph-traffic-sign  data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 underline)"
      >
        How it Works
      </NavLink>
      <NavLink
        href="/faq"
        className="bf-i-ph-question data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 underline)"
      >
        FAQ{" "}
      </NavLink>
   
      <NavLink
        href="/blog"
        className="bf-i-ph-newspaper data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 underline)"
      >
        Blog
      </NavLink>
      <NavLink
        href="/contact"
        className="bf-i-ph-phone data-[in-path=true]:(c-accent11 underline) data-[in-sub-path=true]:(c-accent11 underline)"
      >
        Contact Us
      </NavLink>
    </>
  );
}
