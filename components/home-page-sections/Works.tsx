import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import { useState } from "react";
import Button from "../ui/button";
import ShowMore from "../ShowMore";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";

export default function Works() {
  return (
    <section className="relative">
      <BluredCircle radius={200} top="20%" left="95%" bg="bg-gold2" blur="200px" />
      <BluredCircle radius={250} top="30rem" left="20%" bg="bg-sky1 opacity-50" blur="200px" />
      <div className="mx-auto max-w-page">
        <h2 className="H1" id="works">
          Work        </h2>
        <Space size="h-8" />
        <ul>
          {/* <WorksGrid /> */}
        </ul>
      </div>
    </section>
  );
}

function WorksGrid({ title, start, end, startMobile, endMobile, company, children }) {
  return (
    <li className="pis-2">
      <h3 className="">
        <div className="H5 line-height-0.8 tracking-wide">{company}</div>
        <Space size='h-1' />
        <div className="flex flex-wrap items-baseline  tracking-wide">
          <div className="font-content  c-base11 whitespace-nowrap mie-2">{title}</div>
          <DesktopOnly>
            <div className="c-base11 fs-sm ">
              {start} - {end}
            </div>
          </DesktopOnly>
          <MobileOnly>
            <div className="c-base11 fs-sm ">
              {startMobile} - {endMobile}
            </div>
          </MobileOnly>
        </div>
      </h3>

      <Space size="h-6" />
      <ShowMore minHeight="3em">
        <ul
          className={`list-disc-outside  fs-sm space-y-0.5em `}
          style={{
            listStyleImage: 'url("circle-list-item-marker.svg")',
          }}
        >
          {children}
        </ul>
      </ShowMore>

      <Space size="xs:h-2 h-8" />
    </li>
  );
}

function Overlay({ expanded }) {
  return (
    <div className="relative">
      {!expanded && (
        <div className="bg-gradient-to-b from-transparent  to-sand1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
      )}
    </div>
  );
}

function Li({ className = "", children }) {
  return (
    <li className={`${className} flex gap-1.5 items-baseline`}>
      <div className="pb-0.125em ">
        <div className="w-1.5 h-1.5 rd-full  bg-base6 shrink-0 " />
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}
