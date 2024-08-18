"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ButtonProps, classes } from "./Button";

type Ref = HTMLAnchorElement;
type AllProps = React.ComponentPropsWithoutRef<"a"> & Omit<ButtonProps, "isLoading"> & { href: string };
const LinkButton = forwardRef<Ref, AllProps>(function (
  { className, preStyled = true, variation, href, children, iconButton = false, rounded = false, ...props },
  ref
) {
  const cls = `inline-flex items-center justify-center  ${classes.base} ${classes[variation]}
      ${rounded ? "rd-full" : "rd-0.5em"}
      ${iconButton ? "h-2.75em w-2.75em" : "h-2.75em px-1em "}
      ${!iconButton ? "min-w-6em" : ""}
  `;

  return (
    <a
      ref={ref}
      href={href}
      className={`${preStyled ? cls : ""} ${className}`}
      style={{ textDecoration: "none" }}
      {...props}
    >
      {children}
    </a>
  );
});

LinkButton.displayName = "LinkButton";
export default LinkButton;
