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
    <RadixToolTip.Root>
      <RadixToolTip.Trigger asChild>{trigger}</RadixToolTip.Trigger>
      <RadixToolTip.Portal>

        <RadixToolTip.Content
          className={`
            ${styles["TooltipContent"]}`}
            sideOffset={5}
            >
            <div className='rd-3  p-4
               shd-tinted-2 bg-white
            '>

          {children}
          <RadixToolTip.Arrow
  /* padding: 1.25rem; */
            className={`fill-white ${styles["TooltipArrow"]}`}
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
