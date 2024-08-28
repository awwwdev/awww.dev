import Link from "next/link";
import HamburgerButton from "./HamburgerButton";
import BlogLink from "./HybridLink";
import DesktopHeaderTempalte from "./DesktopHeaderContainer";
import HybridLink from "./HybridLink";
import MobileHeaderTempalte from "./MobileHeaderContainer";

const Header = () => {
  return (
    <>
      <MobileHeaderTempalte>
        <MobileHeader />
      </MobileHeaderTempalte>
      <DesktopHeaderTempalte>
        <PublicWebsiteNav />
      </DesktopHeaderTempalte>
    </>
  );
};

export default Header;

function MobileHeader() {
  return (
    <div className={` w-full max-w-page mx-auto grid `} style={{ gridTemplateColumns: "1fr auto 1fr" }}>
      <div className="flex ">
        <HamburgerButton />
      </div>
      <Link href="/" className="fs-sm fw-300 c-base11 tracking-wider font-display flex justify-center items-center">
        awwww.dev
      </Link>
      <div className="flex justify-end items-center">
        {/* <LocaleSwitcher /> */}
        {/* <MobileAccountButtons /> */}
      </div>
    </div>
  );
}

function PublicWebsiteNav() {
  return (
    <nav className="w-full font-display">
      <ul className="flex items-center gap-4  text-xs sm:text-base w-full ">
        <li className="flex items-center">
          <HybridLink
            pageUrl="/"
            inSamePageHref={"#hero"}
            href={"/"}
            className="rd-1 text-xs sm:text-base flex justify-center  items-center  tracking-wider fw-300"
          >
            awww.dev
          </HybridLink>
        </li>
        <li className="mis-auto">
          <a href="#works" className="hover:c-base11 rd-1">
            Works
          </a>
        </li>
        <li>
          <a href="/#tools" className="hover:c-base11 rd-1">
            Tools
          </a>
        </li>
        <li>
          <HybridLink pageUrl="/" inSamePageHref={"#blog"} href={"/blog"} className="hover:c-base11 rd-1">
            Blog
          </HybridLink>
        </li>

        <li>
          <a href="#contact" className="hover:c-base11 rd-1">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
