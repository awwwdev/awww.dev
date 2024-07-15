"use client";

import { forwardRef } from "react";
import Icon from "../Icon";

export type ButtonProps = {
  variation: "ghost" | "ghost-prm" | "solid" | "solid-prm" | "text" | "text-prm" | "soft" | "soft-prm";
  isLoading?: boolean;
  iconButton?: boolean;
  noPreStyle?: boolean;
  width?: "parent" | "content" | "default";
};
type Ref = HTMLButtonElement;
type AllProps = React.ComponentPropsWithoutRef<"button"> & ButtonProps;

const parts = {
  borderColor: {
    transparent: "b-transparent",
    gray: "b-sand5 hover:b-sand6 active:b-sand6",
    accent: "b-prmA-4 hover:b-prm5 active:b-prm5",
  },
  bg: {
    transparent: {
      gray: "hover:bg-sand4 active:bg-sandA-4",
      accent: "hover:bg-prm4 active:bg-prmA-4",
    },
    soft: {
      gray: "bg-sand4 hover:bg-sandA-4 active:bg-sandA-5",
      accent: "bg-prm4 hover:bg-prmA-4 active:bg-prmA-5",
    },
    solid: {
      gray: "bg-blackA-12 hover:bg-blackA-12/80  active:bg-blackA-12/70",
      accent: "bg-prm9 hover:bg-prm10 active:bg-prm11",
    },
  },
  textColor: {
    gray: "",
    accent: "c-prm11",
    white: "c-white",
  },
};

export const classes = {
  base: `rd-0.5em b-1 fw-500 cursor-pointer appearance-none underline-none text-center whitespace-nowrap leading-1em
  focus-visible:outline-prm11
  focus:outline-prm9
  focus:outline-offset-3
  focus:outline-1.5
  `,
  text: `${parts.textColor.gray} ${parts.borderColor.transparent} ${parts.bg.transparent.gray}`,
  "text-prm": `${parts.textColor.accent} ${parts.borderColor.transparent} ${parts.bg.transparent.accent}`,
  ghost: ` ${parts.textColor.gray} ${parts.borderColor.gray} ${parts.bg.transparent.gray}`,
  "ghost-prm": `${parts.textColor.accent} ${parts.borderColor.accent} ${parts.bg.transparent.accent}`,
  soft: `${parts.textColor.gray} ${parts.borderColor.transparent} ${parts.bg.soft.gray}  `,
  "soft-prm": `${parts.textColor.accent} ${parts.borderColor.transparent} ${parts.bg.soft.accent}`,
  solid: `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.gray}`,
  "solid-prm": `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.accent}`,
};

export const disabledClasses = {
  base: `aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-sand10  `,
  text: `  aria-[disabled]:c-sand10 aria-[disabled]:b-transparent`,
  "text-prm": ` aria-[disabled]:c-sand10 aria-[disabled]:b-transparent`,
  soft: ` aria-[disabled]:c-sand10 aria-[disabled]:bg-sand4 aria-[disabled]:b-transparent`,
  "soft-prm": ` aria-[disabled]:c-sand10 aria-[disabled]:bg-sand4 aria-[disabled]:b-transparent`,
  ghost: ` aria-[disabled]:c-sand10 aria-[disabled]:b-sand4`,
  "ghost-prm": ` aria-[disabled]:c-sand10 aria-[disabled]:b-sand4`,
  solid: "aria-[disabled]:bg-sand8 aria-[disabled]:c-sand2 aria-[disabled]:b-transparent",
  "solid-prm": "aria-[disabled]:bg-sand8 aria-[disabled]:c-sand2 aria-[disabled]:b-transparent",
};

const Button = forwardRef<Ref, AllProps>(function Button(
  { noPreStyle, className, variation, children, isLoading, iconButton, disabled, width = "default", ...props },
  ref
) {
  const cls = `
      relative isolate
      ${classes.base} ${!disabled && classes[variation]}
       ${iconButton ? "h-2.75em w-2.75em" : "h-2.75em px-1em"}
       ${width === "parent" ? "w-full" : width === "content" ? "" : "min-w-6em"} 
       ${disabled ? `${disabledClasses.base} ${disabledClasses[variation]}` : ""}`;

  return (
    <button
      ref={ref}
      className={`${!noPreStyle && cls} ${className}`}
      aria-disabled={disabled}
      aria-busy={isLoading}
      onClick={(e) => {
        if (disabled || isLoading) {
          e.preventDefault();
        } else {
          props?.onClick?.(e);
        }
      }}
      {...props}
    >
      <span className={` w-full h-full ${isLoading ? "invisible" : ""}`}>{children}</span>
      {isLoading && (
        <Icon name='bf-i-svg-spinners:ring-resize' subdued={false}  className="   z-10  absolute top-50% left-50% -translate-x-50% -translate-y-50%" />
      )}
    </button>
  );
});

export default Button;
