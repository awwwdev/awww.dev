import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const studentQ = useQuery({
    queryKey: ["studentsAccount-1"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("student")
        .select(`id, payerId, user(firstname, lastname)`)
        .eq("payerId", userMeQ.data?.payer.id);
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer?.id,
  });

  if (!userMeQ.data?.isPayer) {
    return <p>You don&apos;t have access to this page.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">
        Your <span className="font-light">students</span>
      </h1>

      {renderNoData(studentQ) ?? (
        <div className="space-y-4">
          {studentQ.data.map((student) => (
            <div key={student.id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">
                  {student.user.firstname} {student.user.lastname}
                </p>
              </div>
              <Link href={`/account/students/${student.id}`} className='btn-ghost-prm'>
                Edit
              </Link>
            </div>
          ))}
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
      const { data, error } = await supabase.from("user").select(`*`).eq("id", session.user.id).single();
      if (error) throw error;
      return data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
