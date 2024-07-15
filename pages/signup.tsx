import useGetUserMe from "@/hooks/useGetUserMe";
import LoginBox from "@/components/LoginBox";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import SignUpBox from '@/components/SignUpBox';

const HomePage = () => {
  const session = useSession();
  // const supabase = useSupabaseClient()
  // return (
  //   <div >
  //     <h1>Darsoon Dashboards</h1>
  //     <PageContent />
  //   </div>
  // )

  // return (
  //   <>
  //     {!session ? (
  //       <div className="row bg-red-100">
  //         <div className="col-6">
  //           <h1 className="header">PLease Login</h1>
  //           {/* <p className="">
  //             Experience our Auth and Storage through a simple profile management example. Create a
  //             user profile and upload an avatar image. Fast, simple, secure.
  //           </p> */}
  //         </div>
  //         <div className="col-6 auth-widget">
  //           <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
  //         </div>
  //       </div>
  //     ) : (
  //       <>
  //         <h3>Account</h3>
  //         <div>Your are logged in</div>
  //       </>
  //     )}
  //   </>)

  return (
    <div className="h-full flex flex-col jc ac gap-6">
      <h1 className="H3 !mb-8">Welcome to Dashboards</h1>
      <PageContent />
    </div>
  );
};

export default HomePage;

const PageContent = () => {
  const userMeQ = useGetUserMe();

  if (userMeQ?.isLoading) return <>Loading ...</>;
  if (!userMeQ?.data) return <SignUpBox />;

  return (
    <div>
      <p>You are logged in.</p>
    </div>
  );
};
