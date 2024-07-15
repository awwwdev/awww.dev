import { RNode } from "@/types";
import React from "react";
import Icon from "../Icon";

type Variant = "info" | "success" | "warning" | "error" | "danger" | undefined;

export default function Snack({ children, variant }: { children?: RNode; variant: Variant }) {
  const classes = {
    base: "b-1  rd-lg p-4 text-sm rd-lg p-3  rel isolate",
    info: " b-blue7  bg-blue3 c-blue11  ",
    warning: " b-yellow7  bg-yellow3 c-yellow11  ",
    danger: "",
    success: " b-green7  bg-green3 c-green11  ",
    error: " b-red7  bg-red3 c-red11 ",
  };
  return (
    <div className={`flex gap-2 ${classes.base} ${variant && classes[variant]}`}>
      {variant === "info" && <Icon name="bf-i-ph-info" subdued={false} />}
      {variant === "success" && <Icon name="bf-i-ph-check-circle" subdued={false} />}
      {variant === "danger" && <Icon name="bf-i-ph-fire" subdued={false} />}
      {variant === "warning" && <Icon name="bf-i-ph-warning" subdued={false} />}
      {variant === "error" && <Icon name="bf-i-ph-warning-octagon" subdued={false} />}
      <div>{children}</div>
    </div>
  );
}
