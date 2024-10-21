import { toast } from "react-hot-toast";
import styles from "./styles.module.css";
import { useRef, useState } from "react";

const Pre = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"pre">) => {
  const ref = useRef<HTMLPreElement>(null!);
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className={`@container ${styles["container"]} ${className} text-subdued `}>
      <pre ref={ref} className={`${styles["pre"]} p-1 pis-3 `} {...props}>
        {children}
      </pre>
      <button
        className={`${
          styles["copy-button"]
        } bg-teal-blue before:mie-1 b-base11 !before:mis-0 ${
          isCopied ? "bf-i-ph-check c-green11 " : "bf-i-ph-copy"
        } @2xl:px-3 @2xl:py-1 p-1 pie-0 flex items-center  text-xs  rounded-lg  `}
        onClick={() =>
          navigator.clipboard.writeText(ref.current.textContent ?? "").then(
            () => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            },
            () => {
              setIsCopied(false);
              toast.error("Faild to copy. Please Try Again!");
            }
          )
        }
      >
        <span className={styles["copy-button-text"]}>
          {/* {isCopied ? "Copied" : "Copy"} */}
        </span>
      </button>
    </div>
  );
};
export default Pre;
