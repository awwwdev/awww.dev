
import Link from "next/link";
import HamburgerButton from './HamburgerButton';

const Header = () => {
  return (
    <div className="">
      <MobileHeader   />
      <DesktopHeader  />
    </div>
  );
};

export default Header;

function MobileHeader() {

  return (
    <header
      className={`   sm:hidden  px-4  sticky top-0 z-10 h-16 flex items-center `}
    >
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
    </header>
  );
}

function DesktopHeader({  }) {
  return (
    <header className={`  sm:flex hidden  px-4   sticky top-0 z-10 h-16 items-center c-melow `}>
      <div className={`w-full max-w-page mx-auto flex justify-between items-center gap-0.5 `}>
       <PublicWebsiteNav />
        {/* <Search /> */}
        {/* <LocaleSwitcher /> */}
        {/* <AccountButtons /> */}
      </div>
    </header>
  );
}

function PublicWebsiteNav() {

  return (
    <nav className="w-full font-display">
      <ul className="flex items-center gap-4  text-xs sm:text-base w-full ">
        <li className="flex items-center">
          <Link href="/" className=" text-xs sm:text-base flex justify-center  items-center  tracking-wider fw-300">
        awww.dev
          </Link>
        </li>
        <li className='mis-auto'>
          <a href="#works" className="hover:c-base11">
            Works
          </a>
        </li>
        <li>
          <a href="#tools" className="hover:c-base11">
            Tools
          </a>
      </li>
        <li>
          <a href="#blog" className="hover:c-base11">
          Blog
          </a>
        </li>

        <li>
          <a href="#contact" className="hover:c-base11">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
