'use client';

import * as RadixScrollArea from "@radix-ui/react-scroll-area";

export default function ScrollArea({children}) {

  return (
    <RadixScrollArea.Root
    className="blog-section-fade-x"
    style={{
      marginLeft: "-1rem",
      marginRight: "-1rem",
    }}
  >
    <RadixScrollArea.Viewport className="w-full h-full rd-2 ">
      {children}
    </RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar
      className="max-w-page mx-auto  flex select-none touch-none lt-sm:mx-4 p-0.5 rd-full  bg-base3 transition-colors duration-[500ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
      orientation="horizontal"
    >
      <RadixScrollArea.Thumb className="flex-1 bg-base7 rd-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-11 before:min-h-11" />
    </RadixScrollArea.Scrollbar>
  </RadixScrollArea.Root>

  )
}

ScrollArea.ScrollBar = RadixScrollArea.Scrollbar;
ScrollArea.Thumb = RadixScrollArea.Thumb;