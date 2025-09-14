"use client";

import { useState } from "react";
import Button from "./ui/button";
import GradientBorderOverlay from './ui/GradientBorderOverlay';
import Icon from "./ui/Icon";

export default function ShowMore({ children, minHeight = "0fr" }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="">
      <div
        className={`grid fade-to-b`}
        style={{
          gridTemplateRows: expanded ? `1fr ${minHeight}` : `0fr ${minHeight}`,
          maskImage: `linear-gradient(to bottom, black 0%,  rgba(0 0 0 / var(--fade-to-opacity)) 100%)`,
          "--fade-to-opacity": expanded ? "1" : "0",
          transition: "grid-template-rows 500ms ease-out,  --fade-to-opacity 500ms ease-out",
        }}
      >
        <div
          className={`overflow-hidden `}
          style={{
            gridRow: "1/-1",
          }}
        >
          {children}
        </div>
      </div>

      <div
        className={`${expanded ? "h-9" : "h-3"}`}
        style={{
          transition: "height 500ms ease-out",
        }}
      />
      <div className="flex justify-center items-center">
        <div className="c-base5 h-1px grow bg-gradient-to-l from-current-color via-current-color to-transparent via-80%"
        ></div>
        <Button
          variation="ghost"
          rounded
          className="fs-xs flex gap-1.5 items-center !h-2.25em !b-0 relative !bg-transparent hover:bg-gradient-to-br from-transparent via-transparent via-30% to-base3A"
          onClick={() => {
            setExpanded((s) => !s);
          }}
        >
             <GradientBorderOverlay to="to-transparent" via="via-slate2A" direction="135deg" />
             <GradientBorderOverlay from="from-transparent" via="via-slate2A" direction="135deg" />
          <span className={` ${expanded ? "rotate-180" : "rotate-0"}`} style={{ transition: "transform 500ms ease" }}>
            <Icon name="bf-i-ph-caret-down-bold" subdued />
          </span>
          <span className="c-base11">{expanded ? "Show Less" : "Show More"}</span>
        </Button>
        <div className="c-base5 h-1px grow bg-gradient-to-r from-current-color via-current-color to-transparent via-80%"></div>
      </div>
    </div>
  );
}
