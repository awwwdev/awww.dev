import { HTMLProps } from "@/types";
import { forwardRef, useId } from "react";
import Label from "./ui/Label";
import ErrorMessage from './ui/ErrorMessage.tsx';

type SelectProps = {
  name: string;
  label?: React.ReactNode;
  hint?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue?: (val: string) => void;
  errorMessage?: string;
} & HTMLProps<"select">;
type Ref = HTMLSelectElement;
type AllProps = React.ComponentPropsWithoutRef<"select"> & SelectProps;

const classes = {
  hint: "text-xs c-sand11 italic pt-0.3em pb-0.5em",
  wrapper: {
    base: `h-2.75em  rd-0.5em leading-1em overflow-hidden  whitespace-nowrap
     b-1 b-sand7 hover:b-sand8
     bg-base3 
     grid grid-auto-flow-col
     focus-within:outline-transparent focus-within:b-accent9 focus-within:hover:b-accent9 `,
    disabled: "aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-sand10",
  },
  selectElement: {
    base: ` px-0.75em py-0.375em bg-transparent focus:outline-transparent line-height-1`,
    disabled: "",
  },
  errorMessage: "",
};

const Select = forwardRef<Ref, AllProps>(function ({ placeholder, errorMessage , disabled, required, hint, label, options, name, ...selectProps }, ref) {
  const id = useId();

  const hintId = hint ? `${id}-hint` : "";
  const errorMessageId = errorMessage ? `${id}-error-message` : "";

  return (
    <div className="grid">
      <Label name={name} required={required}>
        {label}
      </Label>
      <Hint id={hintId} hint={hint} />
      <div className={`${classes.wrapper.base} ${disabled && classes.wrapper.disabled} `}>
        <select ref={ref} className={`${classes.selectElement.base}   ${disabled && classes.selectElement.disabled}  `} {...selectProps}>
          <option selected value="" disabled>
            {placeholder}
          </option>
          {options.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="line-clamp-1" style={{height: 'var(--line-height)'}}>
        <ErrorMessage id={errorMessageId} >{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
});

export default Select;

function Hint({ hint, id }) {
  if (!hint) return <></>;
  return (
    <p className={classes.hint} id={id}>
      {hint}
    </p>
  );
}
