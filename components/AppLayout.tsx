import Footer from "@/components/Footer";
import Header from "@/components/header";
import SideMenu from "@/components/SideNav";
import GlobalProvider from "./Provider";
import Noise from "./ui/Noise";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      {/* <Noise className="absolute top-0 bottom-0 left-0 right-0 -z-10"></Noise> */}
      <div className={`side-menu-container isolate h-full  overflow-x-hidden  mx-auto max-w-screen  `}>
        <div className="main grid h-full max-w-screen isolate" style={{ gridTemplateRows: "auto 1fr auto" }}>
          <Header />
          <main className={` h-full max-w-screen `}>{children}</main>
          <Footer />
        </div>
        {<SideMenu />}
      </div>
      {/* <MyToaster/> */}
    </GlobalProvider>
  );
}
