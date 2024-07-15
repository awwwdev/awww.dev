import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import Image from 'next/image';
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const Page: NextPage = () => {
  const userMeQ = useGetUserMe();
  const supabase = useSupabaseClient();
    const userImageQ = useQuery({
      queryKey: ["userImage", userMeQ.data?.id],
      queryFn: async () => {
        // Attempt to list files in the "user" bucket with the prefix of the user's ID
        const { data: fileList, error } = await supabase.storage.from("user").list("", {
          limit: 1,
          search: userMeQ.data?.id,
        });

        let publicUrlResponse;

        if (fileList && fileList.length > 0) {
          // If the file exists, get its public URL
          publicUrlResponse = await supabase.storage.from("user").getPublicUrl(userMeQ.data?.id);
        } else {
          // If the file does not exist, get the public URL of the 'default' file
          publicUrlResponse = await supabase.storage.from("user").getPublicUrl("default");
        }

        // Construct the URL with a timestamp to prevent caching issues
        if (publicUrlResponse.data) {
          return `${publicUrlResponse.data.publicUrl}?t=${new Date().getTime()}`;
        } else {
          // Fallback URL if both attempts fail
          return "https://github.com/shadcn.png";
        }
      },
      enabled: !!userMeQ.data?.id,
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">
        Your <span className="font-light">info</span>
      </h1>

      {userMeQ.data?.isPayer && (
        <div className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            <div className="flex justify-between space-x-4">
              <Link href="/account/edit-profile" className="btn-ghost-prm flex-1 text-center">
                Edit profile
              </Link>
              <Link href="/account/students" className="btn-ghost-prm flex-1 text-center">
                View students
              </Link>
              <Link href="/account/change-password" className="btn-ghost-prm flex-1 text-center">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      )}

      {renderNoData(userMeQ) ?? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Image
              src={userImageQ.data!}
              alt="Current Profile Picture"
              width={100}
              height={100}
              className="mt-4 rounded-lg"
            />
            <Link href="/account/change-profile-picture" className="ml-4 btn-prm">
              Edit Profile Picture
            </Link>
          </div>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Firstname:</strong> {userMeQ.data.firstname}
            </p>
            <p>
              <strong>Lastname:</strong> {userMeQ.data.lastname}
            </p>
            <p>
              <strong>Firstname (Farsi):</strong> {userMeQ.data.firstnameFa}
            </p>
            <p>
              <strong>Lastname (Farsi):</strong> {userMeQ.data.lastnameFa}
            </p>
            <p>
              <strong>Email:</strong> {userMeQ.data.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();

  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["userAccount-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user").select(`*`).eq("id", session?.user.id).single();
      if (error) throw error;
      return data;
    },
  });

    await queryClient.prefetchQuery({
      queryKey: ["userImage", session?.user.id],
      queryFn: async () => {
        // Attempt to list files in the "user" bucket with the prefix of the user's ID
        const { data: fileList, error } = await supabase.storage.from("user").list("", {
          limit: 1,
          search: session?.user.id,
        });

        let publicUrlResponse;

        if (fileList && fileList.length > 0) {
          // If the file exists, get its public URL
          publicUrlResponse = await supabase.storage.from("user").getPublicUrl(session?.user.id!);
        } else {
          // If the file does not exist, get the public URL of the 'default' file
          publicUrlResponse = await supabase.storage.from("user").getPublicUrl("default");
        }

        // Construct the URL with a timestamp to prevent caching issues
        if (publicUrlResponse.data) {
          return `${publicUrlResponse.data.publicUrl}?t=${new Date().getTime()}`;
        } else {
          // Fallback URL if both attempts fail
          return "https://github.com/shadcn.png";
        }
      },
    });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
