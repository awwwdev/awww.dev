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
import { QueryClientProvider, QueryClient, Hydrate, DehydratedState, useQuery } from "@tanstack/react-query";
import useGetUserMe from "@/hooks/useGetUserMe";
import useRouteType from "@/hooks/useRouteType";
import { useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Lnk from "@/components/Lnk";
import Icon from "@/components/ui/Icon";

import TimeZoneProvider from "@/components/TimeZoneProvider";
import PageLayout from "@/components/layouts/PageLayout";
import Footer from "@/components/Footer";
import { AuthChangeEvent } from "@supabase/supabase-js";
import MonthsProvider from "@/components/MonthsProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";

import supabase from "@/utils/supabase";
import Invoice from "@/components/Invoice";
import SideMenu from "@/components/SideNav";
import { appWithTranslation } from "next-i18next";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session; dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  // const user = useUser();
  // useEffect(() => {
  //   if (user) queryClient.invalidateQueries({ queryKey: ['userMe'] });
  // }, [user]);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const router = useRouter();
  const { pathname } = useRouter();

  const isInDashboard = useMemo(
    () =>
      ["/admin-dashboard", "/payer-dashboard", "/teacher-dashboard", "/account"].some((path) =>
        pathname.startsWith(path)
      ),
    [pathname]
  );

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event: AuthChangeEvent, session) => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      if (event === "PASSWORD_RECOVERY") router.push("/account/change-password");
      if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        router.push("/");
      }
    });
  }, [router , queryClient, supabaseClient]);

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* <ThemeProvider attribute="class"> */}
          <TimeZoneProvider>
            <MonthsProvider>
              <RouteProtector>
                <InvoiceSubmissionProtector>
                  <div
                    className={`${
                      !isInDashboard && "bg-[#FCF9F7]"
                    } side-menu-container isolate h-full  overflow-x-hidden  mx-auto max-w-screen  `}
                  >
                    <div className="main grid h-full max-w-screen isolate" style={{ gridTemplateRows: "auto 1fr auto" }}>
                      <Header setIsSideMenuOpen={setIsSideMenuOpen} isInDashboard={isInDashboard} />
                      <main className={`${isInDashboard ? "p-8" : router.asPath === '' ? '' : 'p-4'} h-full max-w-screen `}>
                        <PageLayout>
                          <Component {...pageProps} />
                        </PageLayout>
                      </main>
                      <Footer />
                    </div>
                    {<SideMenu {...{ isSideMenuOpen, setIsSideMenuOpen, isInDashboard }} />}
                  </div>
                </InvoiceSubmissionProtector>
              </RouteProtector>
            </MonthsProvider>
          </TimeZoneProvider>
          <Toaster position="bottom-right" />
          {/* </ThemeProvider> */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default appWithTranslation(MyApp);

const RouteProtector = ({ children }) => {
  const routeType = useRouteType();

  if (!routeType.type) return children;
  return <DashboardRouteProtector>{children}</DashboardRouteProtector>;
};

const DashboardRouteProtector = ({ children }) => {
  const routeType = useRouteType();
  const userMeQ = useGetUserMe();
  if (userMeQ.isLoading)
    return (
      <div className="h-full flex flex-col gap-6 jc ac ">
        <LoadingSpinner />
      </div>
    );

  if (routeType.isAdmin && !userMeQ?.data?.isAdmin)
    return <div className="flex flex-col jc ac w-full">Only admins have access to this page.</div>;
  if (routeType.isTeacher && !userMeQ?.data?.isTeacher)
    return <div className="flex flex-col jc ac w-full">Only Teachers have access to this page.</div>;
  if (routeType.isPayer && !userMeQ?.data?.isPayer)
    return <div className="flex flex-col jc ac w-full">Only Payers have access to this page.</div>;
  if (routeType.isUser && !userMeQ?.data)
    return <div className="flex flex-col jc ac w-full">Only Users have access to this page.</div>;

  return children;
};

const InvoiceSubmissionProtector = ({ children }) => {
  const routeType = useRouteType();
  const userMeQ = useGetUserMe();
  const invoiceSubmittedQ = useQuery({
    queryKey: ["invoiceSubmitted-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teacher")
        .select(`id, invoiceSubmitted`)
        .eq("id", userMeQ.data?.teacher.id)
        .single();
      if (error) throw error;
      return data.invoiceSubmitted;
    },
    enabled: !!userMeQ.data?.teacher?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  if (userMeQ.isLoading)
    return (
      <div className="h-full flex flex-col gap-6 jc ac ">
        <LoadingSpinner />
      </div>
    );

  if (routeType.isTeacher) {
    if (invoiceSubmittedQ.isLoading) {
      return (
        <div className="h-full flex flex-col gap-6 jc ac ">
          <LoadingSpinner />
        </div>
      );
    }
    if (invoiceSubmittedQ.data) {
      return children;
    }
    if (!invoiceSubmittedQ.data) {
      return <Invoice />;
    }
  }

  return children;
};

const BreadCrumb = () => {
  const router = useRouter();
  if (router?.asPath === "/") return <></>;
  const steps = router.asPath.split("/");
  return (
    <div className="flex">
      <Lnk href="/" className="py-1 px-2">
        <Icon name="i-ph-home-simple" />
      </Lnk>
      <>
        {steps?.length > 0 &&
          steps.map((step, index) => {
            return (
              <Lnk href={`/${step}`} key={index} className="px-2 py-1">
                {step}
              </Lnk>
            );
          })}
      </>
    </div>
  );
};
