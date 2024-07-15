import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import Label from "../Label";

export default function Switch({
  label,
  ...props
}: RadixSwitch.SwitchProps & { label?: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-2 ">
      <Label className="text-sm font-display fw-300  c-base11">{label}</Label>
      <RadixSwitch.Root
        {...props}
        className={`w-2.625em p-0.125em bg-base6 rounded-full flex items-center  cursor-default b-none
       overflow-clip
        data-[state=checked]:bg-accent10 `}
        // style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
      >
        <RadixSwitch.Thumb
          className={` w-1.25em h-1.25em bg-white rounded-full shadow transition-transform duration-100 will-change-transform
         data-[state=checked]:translate-x-1.125em`}
        />
      </RadixSwitch.Root>
    </div>
  );
}
