"use client";

import * as RadixToolTip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
import GradientBorderOverlay from '../GradientBorderOverlay';
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
              <GradientBorderOverlay
                from={"from-base3A"}
                via={"via-transparent"}
                to={"to-transparent"}
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
