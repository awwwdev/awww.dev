"use client";

import { useEffect, useState } from "react";

export default function MobileHeaderTempalte({ children }) {
  const [isOnTop, setIsOnTop] = useState(true);
  useEffect(() => {
    window.onscroll = () => {
      return window.pageYOffset === 0 ? setIsOnTop(true) : setIsOnTop(false);
    };
    return () => {
      window.onscroll = null;
    };
  });
  return (
    <header className={` isolate   sm:hidden   sticky top-0 z-10 h-16 grid z-100  `}>
      <BackdropBlurOverlay isOnTop={isOnTop} />
      <div className="flex items-center  px-4" style={{ gridArea: "1/1/-1/-1" }}>
        {children}
      </div>
    </header>
  );
}

function BackdropBlurOverlay({ isOnTop }) {
  return (
    <div
      style={{ gridArea: "1/1/-1/-1" }}
      className={` -z-1 h-full w-full  bg-base2A  b-b-1 b-base3A backdrop-blur-20  opacity-100
       transition-opacity duration-250ms ease`}
    ></div>
  );
}
