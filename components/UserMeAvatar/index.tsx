import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { cn } from "@/lib/utils";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useQuery } from "@tanstack/react-query";
import Avatar from '../ui/Avatar';

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={`aspect-square h-full w-full ${className}`} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default function UserMeAvatar() {
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
    <Avatar  src={userImageQ.data} name={''} />
  );
}
