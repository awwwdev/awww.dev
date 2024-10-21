"use client";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";

export default function ScrollArea({ children }: { children: React.ReactNode}) {
  return (
    <RadixScrollArea.Root
      className="blog-section-fade-x"
      style={{
        // marginLeft: "-1rem",
        // marginRight: "-1rem",
      }}
      scrollHideDelay={1000}
    >
      <RadixScrollArea.Viewport className="w-full h-full rd-2 ">{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className={`max-w-page mx-auto  flex select-none touch-none lt-sm:mx-4 p-0.5 rd-full 
        data-[state=visible]:bg-base3
        data-[state=visible]:hover:bg-base3A
        data-[state=hidden]:bg-transparent
        data-[orientation=vertical]:w-3 
        data-[orientation=horizontal]:flex-col 
        data-[orientation=horizontal]:h-3`}
        style={{
          transition: "background-color 500ms ease-out",
        }}
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb
          className={`flex-1 rd-full
       data-[state=visible]:bg-base6
       data-[state=visible]:hover:bg-base7
       data-[state=hidden]:bg-transparent
       relative before:content-empty before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-11 before:min-h-11
        `}
          style={{
            transition: "background-color 500ms ease-out",
          }}
        />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
}

ScrollArea.ScrollBar = RadixScrollArea.Scrollbar;
ScrollArea.Thumb = RadixScrollArea.Thumb;
