import * as RadixToolTip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
export default function ToolTip({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (

    <RadixToolTip.Provider>
    <RadixToolTip.Root 
    delayDuration={100}
    >
      <RadixToolTip.Trigger asChild>{trigger}</RadixToolTip.Trigger>
      <RadixToolTip.Portal>

        <RadixToolTip.Content
          className={`
            ${styles["TooltipContent"]}`}
            sideOffset={5}
            >
            <div className='rd-3  p-4
               shadow-xl bg-base3
            '>

          {children}
          <RadixToolTip.Arrow
  /* padding: 1.25rem; */
            className={`fill-base3 ${styles["TooltipArrow"]}`}
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
