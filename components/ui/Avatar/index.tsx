import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useGetUserMe from "@/hooks/useGetUserMe";
import { useQuery } from "@tanstack/react-query";

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={`relative isolate flex h-[2em] w-[2em] shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={`aspect-square h-full w-full bg-base4 rd-full ${className}`} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full skeleton ${className}`}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default function Avatar({src, name}) {


  return (
    <AvatarRoot>
      <AvatarImage src={src} />
      <AvatarFallback>{name}</AvatarFallback>
    </AvatarRoot>
  );
}
