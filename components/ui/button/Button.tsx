"use client";

import { forwardRef } from "react";
import Icon from "../Icon";

export type ButtonProps = {
  variation:
    | "ghost"
    | "ghost-accent"
    | "solid"
    | "solid-accent"
    | "text"
    | "text-accent"
    | "soft"
    | "soft-accent"
    | "outline"
    | "outline-accent";
  isLoading?: boolean;
  iconButton?: boolean;
  preStyled?: boolean;
  rounded?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: "button" | "reset" | "submit";
};
type Ref = HTMLButtonElement;
type AllProps = React.ComponentPropsWithoutRef<"button"> & ButtonProps;

const parts = {
  borderColor: {
    transparent: "b-transparent",
    gray: "b-base6 hover:b-base7 active:b-base7",
    accent: "b-accent7 hover:b-accent8 active:b-accent8",
  },
  bg: {
    transparent: {
      gray: "hover:bg-base2A active:bg-base3A",
      accent: "hover:bg-accent2A active:bg-accent3A",
    },
    soft: {
      gray: "bg-base2A hover:bg-base3 active:bg-base4",
      accent: "bg-accent3A hover:bg-accent4A active:bg-accent5A",
    },
    solid: {
      gray: "bg-black12A hover:bg-black12A/60  active:bg-black12A/30 ",
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
  outline: `${parts.textColor.gray} ${parts.borderColor.gray} ${parts.bg.soft.gray}  `,
  "outline-accent": `${parts.textColor.accent} ${parts.borderColor.accent} ${parts.bg.soft.accent}`,
  solid: `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.gray}`,
  "solid-accent": `${parts.textColor.white} ${parts.borderColor.transparent} ${parts.bg.solid.accent}`,
};

export const disabledClasses = {
  base: `aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-base10  `,
  text: `  aria-[disabled]:c-base10 aria-[disabled]:b-transparent`,
  "text-accent": ` aria-[disabled]:c-base10 aria-[disabled]:b-transparent`,
  soft: ` aria-[disabled]:c-base10 aria-[disabled]:bg-base4 aria-[disabled]:b-transparent`,
  "soft-accent": ` aria-[disabled]:c-base10 aria-[disabled]:bg-base4 aria-[disabled]:b-transparent`,
  ghost: ` aria-[disabled]:c-base10 aria-[disabled]:b-base4`,
  "ghost-accent": ` aria-[disabled]:c-base10 aria-[disabled]:b-base4`,
  solid: "aria-[disabled]:bg-base8 aria-[disabled]:c-base2 aria-[disabled]:b-transparent",
  "solid-accent": "aria-[disabled]:bg-base8 aria-[disabled]:c-base2 aria-[disabled]:b-transparent",
};

const Button = forwardRef<Ref, AllProps>(function Button(
  {
    preStyled = true,
    className,
    variation,
    children,
    isLoading,
    iconButton,
    disabled,
    rounded = false,
    prefix,
    suffix,
    type,
    ...props
  },
  ref
) {
  const cls = `
      relative isolate
      ${classes.base} ${!disabled && classes[variation]}
      ${rounded ? "rd-full" : "rd-0.5em"}
      ${iconButton ? "h-2.75em w-2.75em " : "h-2.75em px-1em"}
     
      ${disabled ? `${disabledClasses.base} ${disabledClasses[variation]}` : ""}`;

  return (
    <button
      ref={ref}
      className={`${preStyled && cls} ${className}`}
      aria-disabled={disabled}
      aria-busy={isLoading}
      type={type ?? "button"}
      onClick={(e) => {
        if (disabled || isLoading) {
          e.preventDefault();
        } else {
          props?.onClick?.(e);
        }
      }}
      style={{
        minWidth: iconButton ? "fit-content" : "max(6rem , wit-content)",
        ...props?.style,
      }}
      {...props}
    >
      <Wrapper isLoading={isLoading}>
        {prefix}
        {children}
        {suffix}
      </Wrapper>
      {/* consider using grid overlapping. putting relative on button will interfer with absolute positioning it. */}
      {isLoading && (
        <Icon
          name="bf-i-svg-spinners:ring-resize"
          subdued={false}
          className="   z-10  absolute top-50% left-50% -translate-x-50% -translate-y-50%"
        />
      )}
    </button>
  );
});

export default Button;

function Wrapper({ isLoading, children }) {
  if (isLoading) return <span className="invisible">{children}</span>;
  return <>{children}</>;
}
