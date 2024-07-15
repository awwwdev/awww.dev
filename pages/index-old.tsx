import useGetUserMe from "@/hooks/useGetUserMe";
import LoginBox from "@/components/LoginBox";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import DevOnly from "@/components/DevOnly";
// import { useUser } from "@supabase/auth-helpers-react";

const HomePage = () => {
  const userMeQ = useGetUserMe();
  return (
    <div className="flex flex-col jc  h-full">
      {userMeQ.data && (
        <div className='flex justify-center items-center flex-col'>
          <p className="H1 c-orange9 ">Welcome {userMeQ?.data?.firstname}!</p>
          <p className="mt-10 c-sand11 text-sm">Navigate to your dashboard using the links in the side menu.</p>
        </div>
      )}
      {!userMeQ.data && userMeQ.isLoading && <p>  <LoadingSpinner /></p>}
      {!userMeQ.data && !userMeQ.isLoading && (
        <div className='flex justify-center'>
          <LoginBox />
        </div>
      )}

      {/* <DevOnly>
        <pre>{JSON.stringify(userMeQ, null, 2)}</pre>
      </DevOnly> */}
    </div>
  );
};

export default HomePage;
