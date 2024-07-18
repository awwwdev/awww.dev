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

import type { AppProps } from "next/app";
import {  DehydratedState, useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import {  Session } from "@supabase/auth-helpers-react";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";

import SideMenu from "@/components/SideNav";

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session; dehydratedState: DehydratedState }>) {

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);


  return (
    <>
      <div className={`side-menu-container isolate h-full  overflow-x-hidden  mx-auto max-w-screen  `}>
        <div className="main grid h-full max-w-screen isolate" style={{ gridTemplateRows: "auto 1fr auto" }}>
          <Header setIsSideMenuOpen={setIsSideMenuOpen} />
          <main className={` h-full max-w-screen `}>
              <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        {/* {<SideMenu {...{ isSideMenuOpen, setIsSideMenuOpen }} />} */}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default MyApp;

