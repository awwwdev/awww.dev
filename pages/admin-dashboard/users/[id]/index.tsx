import { renderNoData } from "@/components/RenderQ";
import { Database } from "@/supabase/db_types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getFullName } from "@/utils/formatter";
import RecordTable from "@/components/RecordTable";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page: NextPage = () => {
  const hasUserManagementAccess = useAdminAccess("hasUserManagementAccess");
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const recordQ = useQuery({
    queryKey: ["manage-users-2", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("user").select("*").match({ id: id }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (!hasUserManagementAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    renderNoData(recordQ) ?? (
      <div className="space-y-8">
        <h1 className="H1">
          User: {` `}
          <span className="fw-300"> {getFullName(recordQ.data)}</span>
        </h1>
        <p>
          <code className="">id: {id}</code>
        </p>
        {recordQ.data ? (
          <>
            <div className="flex gap-4 justify-end p-4 b-1 b-gray5 rd-lg bg-gray2">
              <Link href={`/admin-dashboard/users/${id}/edit`} className="bf-i-ph-note-pencil btn-ghost">
                Edit
              </Link>
              {/* <DeleteButton handleDelete={handleDelete} /> */}
            </div>
            <div>
              <RecordTable record={recordQ.data} />
              {/* <pre>{JSON.stringify(recordQ.data, null, 2)}</pre> */}
            </div>
          </>
        ) : (
          <div>
            There is no record with <code>id: {id}</code> in topic.
          </div>
        )}
      </div>
    )
  );
};

export default Page;

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const { id } = ctx.params;
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["topicMasterData-1", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select("*").match({ id }).single();
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
