import { forwardRef } from "react";
import Link from "next/link";
import { ButtonProps, classes } from ".";

type Ref = HTMLAnchorElement;
type AllProps = React.ComponentPropsWithoutRef<"a"> & ButtonProps & { href: string };

const LinkButton = forwardRef<Ref, AllProps>(function (
  { className, noPreStyle, variation, href, children, width = "default", iconButton, ...props },
  ref
) {
  const cls = `inline-flex items-center justify-center  ${classes.base} ${classes[variation]}
  ${iconButton ? "h-2.75em w-2.75em" : "h-2.75em px-1em "}
       ${width === "parent" ? "w-full" : width === "content" ? "" : "min-w-6em"} 
  
  `;

  return (
    <Link ref={ref} href={href} className={`${!noPreStyle && cls} ${className}`} {...props}>
      {children}
    </Link>
  );
});

export default LinkButton;
