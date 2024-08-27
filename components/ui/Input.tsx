import { HTMLProps } from "@/types";
import { forwardRef, useId } from "react";
import Label from './Label';
import ErrorMessage from './ErrorMessage.tsx';

const classes = {
  hint: "text-xs c-base11 italic pt-0.3em pb-0.5em",
  wrapper: {
    base: `h-2.75em  rd-0.5em leading-1em overflow-hidden  whitespace-nowrap
     b-1 b-base7 hover:b-base8
     bg-base3 
     grid grid-auto-flow-col
     focus-within:outline-transparent focus-within:b-accent9 focus-within:hover:b-accent9 `,
    disabled: "aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-base10",
  },
  prefixBox: "",
  inputElement: {
    base: ` px-0.75em  py-0.375em bg-transparent focus:outline-transparent line-height-1`,
    disabled: "",
  },
  suffixBox: "flex",
  errorMessage: "",
};

type InputProps = {
  name: string;
  label?: React.ReactNode;
  hint?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  setValue?: (val: string) => void ; 
  errorMessage?: string;
} & HTMLProps<"input">;
type Ref = HTMLInputElement;
type AllProps = React.ComponentPropsWithoutRef<"input"> & InputProps;

const  Input = forwardRef<Ref, AllProps>(function ({
  hint,
  label,
  name,
  className,
  required,
  prefix,
  suffix,
  disabled,
  onChange,
  setValue,
  errorMessage,
  ...props
}, ref) {
  const id = useId();

  const hintId = hint ? `${id}-hint` : "";
  const errorMessageId = errorMessage ? `${id}-error-message` : "";

  return (
    <div className="grid ">
      <Label name={name} required={required} >{label}</Label>
      <Hint id={hintId} hint={hint} />
      <div className={`${classes.wrapper.base} ${disabled && classes.wrapper.disabled} `}
        style={{
          gridTemplateColumns: `${prefix ? "auto" : ""} 1fr ${suffix ? "auto": ""}`,
        }}
      >
        <PrefixBox prefix={prefix} />
        <input
          ref={ref}
          name={name}
          id={id}
          className={` ${classes.inputElement.base}  ${disabled && classes.inputElement.disabled} `}
          aria-describedby={`${errorMessageId} ${hintId}` }
          aria-invalid={!!errorMessage}
          onChange={(e) => {
            setValue?.(e.target.value);
            onChange?.(e)
          }}
          {...props}
        />
        <SuffixBox suffix={suffix} />
      </div>
      <div className="line-clamp-1" style={{height: 'var(--line-height)'}}>
        <ErrorMessage id={errorMessageId} >{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;


function Hint({ hint, id }) {
  if (!hint) return <></>;
  return (
    <p className={classes.hint} id={id}>
      {hint}
    </p>
  );
}

function PrefixBox({ prefix }) {
  if (!prefix) return <></>;

  return <div className={classes.prefixBox}>{prefix}</div>;
}

function SuffixBox({ suffix }) {
  if (!suffix) return <></>;
  return <div className={classes.suffixBox}>{suffix}</div>;
}
