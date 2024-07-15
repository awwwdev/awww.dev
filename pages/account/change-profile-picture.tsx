import { z } from "zod";
import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { toast } from "react-hot-toast";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";

export const schema = z.object({
  // Other fields...
  profilePicture: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0 && fileList[0] instanceof File, {
      message: "Input is not a valid file",
    })
    .refine((fileList) => fileList[0].size <= 5 * 1024 * 1024, {
      // 5 MB limit
      message: "File size must be less than or equal to 5 MB",
    }),
});

const Page: NextPage = () => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const userMeQ = useGetUserMe();
  const id = userMeQ?.data?.id;

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

  const recordQ = useQuery({
    queryKey: ["userMe", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user")
        .select("id, firstname, lastname, firstnameFa, lastnameFa")
        .match({ id })
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const onSubmit = async (formValues) => {
    // Assuming formValues.profilePicture[0] is the file to be uploaded
    const file = formValues.profilePicture[0];
    if (!file || !id) return; // Early return if no file or user ID is present

    try {
      // Prepare the file for upload
      const filePath = `${id}`; // Optional: Organize files in a folder

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("user").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (uploadError) throw uploadError;

      toast.success("Profile picture updated successfully");
      queryClient.invalidateQueries(["userImage", id]);
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  const form = useFormHook({
    schema,
    onSubmit,
    shouldResetOnSuccess: false,
  });

  return (
    renderNoData(recordQ) ?? (
      <div>
        <h1 className="H1">
          Update {` `}
          <span className="fw-200">Your Profile Picture</span>
        </h1>
        <Image
          src={userImageQ.data!}
          alt="Current Profile Picture"
          width={100}
          height={100}
          className="mt-4 rounded-lg"
        />
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Update">
          <Form.Input type="file" name="profilePicture" accept="image/*" required />
        </Form>
      </div>
    )
  );
};

export default Page;

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const id = session?.user?.id;

  await queryClient.prefetchQuery({
    queryKey: ["userImage", id],
    queryFn: async () => {
      // Attempt to list files in the "user" bucket with the prefix of the user's ID
      const { data: fileList, error } = await supabase.storage.from("user").list("", {
        limit: 1,
        search: id,
      });

      let publicUrlResponse;

      if (fileList && fileList.length > 0) {
        // If the file exists, get its public URL
        publicUrlResponse = await supabase.storage.from("user").getPublicUrl(id!);
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
