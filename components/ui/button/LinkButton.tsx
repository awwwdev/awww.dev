import { forwardRef } from "react";
import Link from "next/link";
import { ButtonProps, classes } from "./Button";

type Ref = HTMLAnchorElement;
type AllProps = React.ComponentPropsWithoutRef<"a"> & Omit<ButtonProps , "isLoading"> & { href: string };
const LinkButton = forwardRef<Ref, AllProps>(function (
  { className, preStyled, variation, href, children, width = "default", iconButton, rounded = false, ...props },
  ref
) {
  const cls = `inline-flex items-center justify-center  ${classes.base} ${classes[variation]}
      ${rounded ? "rd-full" : "rd-0.5em"}
      ${iconButton ? "h-2.75em w-2.75em" : "h-2.75em px-1em "}
       ${width === "parent" ? "w-full" : ""} 
       ${width === "content" ? "w-full" : ""} 
       ${width === "default" && !iconButton ? "min-w-6em" : ""} 
 
  `;

  return (
    <Link ref={ref} href={href} className={`${preStyled && cls} ${className}`} {...props}>
      {children}
    </Link>
  );
});

export default LinkButton;
