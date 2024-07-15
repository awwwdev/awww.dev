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
import { useState } from "react";
import RecordTable from "@/components/RecordTable";
import { toReadableDate } from "@/utils/formatter";
import { z } from "zod";
import useAdminAccess from "@/hooks/useAdminAccess";

const Page: NextPage = () => {
  const hasMasterDataAccess = useAdminAccess("hasMasterDataAccess");
  const router = useRouter();
  const { id } = router.query;
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const recordQ = useQuery({
    queryKey: ["topicMasterData-1", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("topic").select("*").match({ id }).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const [isJustDeleted, setIsJustDeleted] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase.from("topic").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete the record. | Error: " + error.message);
    } else {
      toast.success("Record is successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["topicMasterData-1", id], refetchType: "none" });
      queryClient.invalidateQueries({ queryKey: ["topicMasterData-1"] });
      setIsJustDeleted(true);
    }
  };

  if (!hasMasterDataAccess) return <p>You don&apos;t have access to this page</p>;

  if (isJustDeleted)
    return (
      <div className="space-y-8 h-full flex flex-col jc ac">
        <p className="">You just deleted this record permanently.</p>
        <br />
        <Link
          href={router.pathname.substring(0, router.pathname.lastIndexOf("/"))}
          className="btn-accent bf-i-ph-arrow-u-up-left"
        >
          {" "}
          Go Back{" "}
        </Link>
      </div>
    );

  if (isJustDeleted)
    return (
      <div className="space-y-8 h-full flex jc ac">
        <p className="">You just deleted this record permanently.</p>
        <Link
          href={router.pathname.substring(0, router.pathname.lastIndexOf("/"))}
          className="btn-accent bf-i-ph-arrow-u-up-left"
        >
          {" "}
          Go Back{" "}
        </Link>
      </div>
    );

  return (
    renderNoData(recordQ) ?? (
      <div className="space-y-8">
        <h1 className="H1">
          Topic {` `}
          <span className="fw-300">id: {id}</span>
        </h1>
        {recordQ.data ? (
          <>
            <div className="flex gap-4 justify-end p-4 b-1 b-gray5 rd-lg bg-gray2">
              <Link href={`/admin-dashboard/master-data/topic/${id}/edit`} className="bf-i-ph-note-pencil btn-ghost">
                Edit
              </Link>
              <DeleteButton handleDelete={handleDelete} />
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

const DeleteButton = ({ handleDelete }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="bf-i-ph-trash btn-ghost">Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <AlertDialog.Content
          className="fixed z-50
                w-[95vw] max-w-md rounded-lg p-4 md:w-full 
                top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                bg-gray2 space-y-6"
        >
          <AlertDialog.Title className="fw-700">Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            Deleting is permanent and cannot be undone.
            <br />
            <br />
            <div className="info-line text-xs">
              If there is any other record with refrence (Foreign Key) to this record, you need to delete those first.
              Otherwise deletion will fail.
            </div>
          </AlertDialog.Description>
          <div className="flex gap-4 justify-end">
            <AlertDialog.Cancel asChild>
              <button className="btn">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="btn-danger" onClick={handleDelete}>
                Yes, delete this record
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
