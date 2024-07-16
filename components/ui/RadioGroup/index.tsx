import Legend from "@/components/Legend";
import { Children, HTMLProps, StateSetter } from "@/types";
import { createContext, useContext, useId } from "react";


const initalValue = {
  value: "",
  name: "",
  setValue: args => undefined
};
const RadioGroupContext = createContext<{
  name: string;
  value: string;
  setValue: StateSetter<string>;
}>(initalValue);

export default function RadioGroup({
  value,
  setValue,
  legend,
  name,
  className,
  children
}: Children & {
  value: string;
  name?: string;
  setValue: StateSetter<string>;
  legend?: React.ReactNode;
  className?: string;
}) {
  return (
    <RadioGroupContext.Provider value={{ value, setValue, name }}>
      <fieldset>
        <Legend
          preStyled
          className="text-sm c-base11 mt-0.5em font-display "
        >
          {legend}
        </Legend>
        <div className={`mt-1 flex gap-0.5em flex-wrap text-sm ${className}`}>
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.Item = RadioItem;



function RadioItem({
  children,
  value,
  className,
  preStyled = true,
  style,
  label,
  ...props
}: {
  label: React.ReactNode;
  preStyled?: boolean;
  value: string;
  className?: string;
} & HTMLProps<"input">) {
  const { value: controledValue, setValue, name } = useContext(
    RadioGroupContext
  );

  return (
    <label
      data-state={controledValue === value ? "active" : "inactive"}
      className={`${preStyled &&
        `px-0.5em pt-0.125em pb-0.175em  b-1  b-base5 c-mauve11 bg-base1 rd-1.2 select-none
        grid
        data-[state=inactive]:hover:b-base6 data-[state=inactive]:hover:bg-base2
      data-[state=active]:bg-accent3  data-[state=active]:c-accent11 data-[state=active]:b-accent8
      `}
       ${className}`}
      style={{ gridTemplateRows: "auto 1fr", ...style }}
    >
        <span>{label}</span>
        <div className="grid items-center align-content-center ">
          {children}
        </div>
        <input
          type="radio"
          name={name}
          value={value}
          checked={controledValue === value}
          onChange={e => setValue(e.target.value)}
          className="sr-only"
          {...props}
        />
    </label>
  );
}