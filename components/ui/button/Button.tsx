"use client";

import { forwardRef } from "react";
import Icon from "../Icon";

export type ButtonProps = {
  variation: "ghost" | "ghost-accent" | "solid" | "solid-accent" | "text" | "text-accent" | "soft" | "soft-accent";
  isLoading?: boolean;
  iconButton?: boolean;
  preStyled?: boolean;
  rounded?: boolean;
  width?: "parent" | "content" | "default";
};
type Ref = HTMLButtonElement;
type AllProps = React.ComponentPropsWithoutRef<"button"> & ButtonProps;

const parts = {
  borderColor: {
    transparent: "b-transparent",
    gray: "b-sand6 hover:b-sand7 active:b-sand7",
    accent: "b-accent6 hover:b-accent7 active:b-accent7",
  },
  bg: {
    transparent: {
      gray: "hover:bg-sand4 active:bg-san4A",
      accent: "hover:bg-accent4 active:bg-accent4A",
    },
    soft: {
      gray: "bg-sand4 hover:bg-sand4A active:bg-sand5A",
      accent: "bg-accent4 hover:bg-accent4A active:bg-accent5A",
    },
    solid: {
      gray: "bg-black12A hover:bg-black12A/80  active:bg-black12A/70",
      accent: "bg-accent9 hover:bg-accent10 active:bg-accent11",
    },
  },
  textColor: {
    gray: "",
    accent: "c-accent11",
    white: "c-white",
  },
};

export const classes = {
  base: ` b-1 fw-500 cursor-pointer appearance-none underline-none text-center whitespace-nowrap leading-1em
  focus-visible:outline-accent11
  focus:outline-accent9
  focus:outline-offset-3
  focus:outline-1.5
  `,
  text: `${parts.textColor.gray} ${parts.borderColor.transparent} ${parts.bg.transparent.gray}`,
  "text-accent": `${parts.textColor.accent} ${parts.borderColor.transparent} ${parts.bg.transparent.accent}`,
  ghost: ` ${parts.textColor.gray} ${parts.borderColor.gray} ${parts.bg.transparent.gray}`,
  "ghost-accent": `${parts.textColor.accent} ${parts.borderColor.accent} ${parts.bg.transparent.accent}`,
  soft: `${parts.textColor.gray} ${parts.borderColor.transparent} ${parts.bg.soft.gray}  `,
  "soft-accent": `${parts.textColor.accent} ${parts.borderColor.transparent} ${parts.bg.soft.accent}`,
  solid: `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.gray}`,
  "solid-accent": `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.accent}`,
};

export const disabledClasses = {
  base: `aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-sand10  `,
  text: `  aria-[disabled]:c-sand10 aria-[disabled]:b-transparent`,
  "text-accent": ` aria-[disabled]:c-sand10 aria-[disabled]:b-transparent`,
  soft: ` aria-[disabled]:c-sand10 aria-[disabled]:bg-sand4 aria-[disabled]:b-transparent`,
  "soft-accent": ` aria-[disabled]:c-sand10 aria-[disabled]:bg-sand4 aria-[disabled]:b-transparent`,
  ghost: ` aria-[disabled]:c-sand10 aria-[disabled]:b-sand4`,
  "ghost-accent": ` aria-[disabled]:c-sand10 aria-[disabled]:b-sand4`,
  solid: "aria-[disabled]:bg-sand8 aria-[disabled]:c-sand2 aria-[disabled]:b-transparent",
  "solid-accent": "aria-[disabled]:bg-sand8 aria-[disabled]:c-sand2 aria-[disabled]:b-transparent",
};

const Button = forwardRef<Ref, AllProps>(function Button(
  { preStyled = true, className, variation, children, isLoading, iconButton, disabled, width = "default", rounded = false, ...props },
  ref
) {
  const cls = `
      relative isolate
      ${classes.base} ${!disabled && classes[variation]}
      ${rounded ? 'rd-full' : 'rd-0.5em'}
       ${iconButton ? "h-2.75em w-2.75em " : "h-2.75em px-1em"}
       ${width === "parent" ? "w-full" : ""} 
       ${width === "content" ? "w-full" : ""} 
       ${width === "default" && !iconButton ? "min-w-6em" : ""} 
       ${disabled ? `${disabledClasses.base} ${disabledClasses[variation]}` : ""}`;

  return (
    <button
      ref={ref}
      className={`${ preStyled && cls} ${className}`}
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
      <span className={`contents ${isLoading ? "invisible" : ""}`}>{children}</span>
      {isLoading && (
        <Icon name='bf-i-svg-spinners:ring-resize' subdued={false}  className="   z-10  absolute top-50% left-50% -translate-x-50% -translate-y-50%" />
      )}
    </button>
  );
});

export default Button;
