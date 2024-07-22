"use client";

import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/tailwind.css";
import "@/styles/reset.css";
import "@/styles/uno.css"; // compiled styles from unocss cli // unocss only create styles for icons (svg-in-css icons with unocss icon preset), other calsses are handled with tailwind
import "@/styles/globals.css";
// import "@/public/fonts/iransans/css/iransans.css";
// import "@/public/fonts/azarmehr/css/azarmehr.css";
// import "@/public/fonts/rubik/css/rubik.css";
import "@/public/fonts/nohemi/css/nohemi.css";
import "@/public/fonts/geist/css/geist.css";

import Footer from "@/components/Footer";
import Header from "@/components/header";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <html className="dark-theme">
      <head>
        <meta charSet="utf-8" />
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta name="robots" content="max-snippet:20, max-image-preview:large" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;900&family=Vazirmatn:wght@400;500;600;700;900&display=swap"
              rel="stylesheet"
            ></link> */}
      </head>
      <body className={`dark-theme bg-sand1 c-sand12 relative isolate`}>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 -z-10 opacity-10"
          style={{
            backgroundImage: "url('/static/noise.svg')",
            backgroundSize: "40%",
            backgroundRepeat: "repeat",
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className={`side-menu-container isolate h-full  overflow-x-hidden  mx-auto max-w-screen  `}>
          <div className="main grid h-full max-w-screen isolate" style={{ gridTemplateRows: "auto 1fr auto" }}>
            <Header setIsSideMenuOpen={setIsSideMenuOpen} />
            <main className={` h-full max-w-screen `}>{children}</main>
            <Footer />
          </div>
          {/* {<SideMenu {...{ isSideMenuOpen, setIsSideMenuOpen }} />} */}
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
