"use client";

import * as RadixToolTip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
export default function ToolTip({
  trigger,
  children,
  open,
  setOpen,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}) {
  return (
    <RadixToolTip.Provider>
      <RadixToolTip.Root
        open={open}
        onOpenChange={(v) => {
          setOpen?.(v);
        }}
        delayDuration={0}
      >
        <RadixToolTip.Trigger asChild>{trigger}</RadixToolTip.Trigger>
        <RadixToolTip.Portal>
          <RadixToolTip.Content
            className={`relative
            ${styles["TooltipContent"]}`}
            sideOffset={5}
          >
            <div
              className="rd-3  p-4 relative
               shadow-2xl shadow-black bg-base2A  backdrop-blur-10
            "
            >
              <GradientBorderLayer
                borderGradeintFrom={"from-base3A"}
                borderGradientVia={"via-transparent"}
                borderGradeintTo={"to-transparent"}
              />

              {children}
              <RadixToolTip.Arrow
                /* padding: 1.25rem; */
                className={`fill-base2 ${styles["TooltipArrow"]}`}
                height={10}
                width={20}
              />
            </div>
          </RadixToolTip.Content>
        </RadixToolTip.Portal>
      </RadixToolTip.Root>
    </RadixToolTip.Provider>
  );
}

function GradientBorderLayer({
  borderGradeintFrom = "from-slate4A",
  borderGradeintTo = "to-slate3A",
  borderGradientVia = "via-slate2A",
}) {
  return (
    <div
      style={{
        // gridArea: "1/1/-1/-1",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: "inherit",
        // overflow: 'clip',
        // borderWidth: 'inherit',
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundClip: "border-box",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor" /*5'*/,
        maskComposite: "exclude" /*5*/,
        backdropFilter: "blur(5px)",
        // zIndex: 9,
      }}
      className={` bg-gradient-to-b bg-base2A ${borderGradeintFrom} ${borderGradientVia} ${borderGradeintTo} b-1 mix-blend-screen `}
    ></div>
  );
}
