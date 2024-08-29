"use client";

import { useEffect, useState } from "react";

export default function DesktopHeaderTempalte({ children }) {
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
    <header
      className={`
   
    sm:grid hidden  items-center  sticky top-0 z-100  h-16  `}
    >
      <BackdropBlurOverlay isOnTop={isOnTop} />
      <div className={`px-4`} style={{ gridArea: "1/1/-1/-1" }}>
        <div className="w-full max-w-page mx-auto flex justify-between items-center gap-0.5">
          {children}
        </div>
      </div>
    </header>
  );
}

function BackdropBlurOverlay({ isOnTop }) {
  return (
    <div
      style={{ gridArea: "1/1/-1/-1" }}
      className={` -z-1 h-full   bg-base2A  b-b-1 b-base3A backdrop-blur-20 ${
        isOnTop ? "opacity-0" : "opacity-100"
      } transition-opacity duration-250ms ease`}
    ></div>
  );
}
