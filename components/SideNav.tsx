"use client";

import Link from "next/link";
import darsoonLogo from "@/public/static/logo/darsoon-logo.png";
import darsoonLogoIcon from "@/public/static/logo/darsoon-logo-icon.png";
import Image from "next/image";
import * as Toggle from "@radix-ui/react-toggle";
import { createContext, useContext, useState } from "react";
import MobileOnly from "./ui/MobileOnly";
import Button from "./ui/button";
import Icon from "@/components/ui/Icon";
import { useGlobalContex } from "./Provider";

const NavContext = createContext({ isCollapsed: false, setIsCollapsed: () => {} });

export default function SideMenu() {
  const { isSideMenuOpen } = useGlobalContex();
  return (
    <>
      <MobileSideMenuOverlay />
      <MobileOnly>
        <div className={` aside w-sidebar bg-gray2 z-30 h-full  ${isSideMenuOpen && "drawer-open"}`}>
          <SideNav className={`text-sm  shd-titned-3  h-full `} />
        </div>
      </MobileOnly>
    </>
  );
}

const MobileSideMenuOverlay = () => {
  const { isSideMenuOpen, setIsSideMenuOpen } = useGlobalContex();
  return (
    <div
      className={` drawer-overlay sm:hidden fixed z-20 inset-0 bg-black2A 
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

function SideNav({ className }) {
  const { isSideMenuOpen, setIsSideMenuOpen } = useGlobalContex();
  const [isCollapsed, _setIsCollapsed] = useState(false);

  const setIsCollapsed = (v) => {
    document.documentElement.style.setProperty("--sidebar-width", v ? "4rem" : "14.5rem");
    _setIsCollapsed(v);
  };

  return (
    <NavContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <nav aria-label="primary" className={className} style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
        <MobileOnly>
          <div className="flex mt-3 ml-1">
            <Button
              variation="text"
              className="!rd-full"
              iconButton
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
            >
              <Icon name="bf-i-ph-x" subdued={false} />
            </Button>
          </div>
        </MobileOnly>
        <div className="p-4 flex flex-col gap-6 sm:gap-3 text-lg  ">
          <PublicWebsiteNav setIsSideMenuOpen={setIsSideMenuOpen} />
        </div>
      </nav>
    </NavContext.Provider>
  );
}

function Logo({ isCollapsed }) {
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
    <div className="hidden sm:block  -mis-1.5">
      <Toggle.Root
        pressed={isCollapsed}
        onPressedChange={(v) => setIsCollapsed(v)}
        aria-label="Toggle italic"
        className={`bg-base3
          hover:bg-base4
      data-[state=on]:bg-base3  
       flex h-6 w-6  items-center justify-center rounded b-1 b-base3  leading-4 `}
      >
        <span className={"sr-only"}>Callpase Side Nav</span>
        {isCollapsed ? <Icon name="bf-i-ph-caret-right" /> : <Icon name="bf-i-ph-caret-left" />}
      </Toggle.Root>
    </div>
  );
}

function NavLink({ href, className, children, onClick }) {
  const { isCollapsed } = useContext(NavContext);
  return (
    <a href={href} className={className} onClick={onClick}>
      <span className={`${isCollapsed ? "sr-only" : ""}`}>{children}</span>
    </a>
  );
}

function PublicWebsiteNav({ setIsSideMenuOpen }) {
  return (
    <>
      <div className="h-2"></div>

      <NavLink
        href="/"
        className="hover:c-base11"
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        awww.dev
      </NavLink>
      <NavLink
        href="#works"
        className="hover:c-base11"
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        Works
      </NavLink>
      <NavLink
        href="#tools"
        className="hover:c-base11"
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        Tools
      </NavLink>
      <NavLink
        href="#blog"
        className="hover:c-base11"
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        Blog
      </NavLink>
      <NavLink
        href="#blog"
        className="hover:c-base11"
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        Contact Me
      </NavLink>
    </>
  );
}
