import { HTMLProps } from "@/types";
import { forwardRef, useId } from "react";
import Label from './Label';
import ErrorMessage from './ErrorMessage.tsx';

const classes = {
  hint: "text-xs c-base11 italic pt-0.3em pb-0.5em",
  wrapper: {
    base: ` rd-0.5em leading-1em  whitespace-nowrap overflow-hidden
     b-1 b-base7 hover:b-base8
     bg-base3 
     grid
     focus-within:outline-transparent focus-within:b-accent9  focus-within:hover:b-accent9
     `,
    disabled: "aria-[disabled]:cursor-not-allowed  aria-[disabled]:c-base10",
  },
  textAreaElement: {
    base: ` px-0.75em py-0.5em bg-transparent focus:outline-transparent line-height-1`,
    disabled: "",
  },
  errorMessage: "",
};

type TextAreaProps = {
  name: string;
  label?: React.ReactNode;
  hint?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  setValue?: (val: string) => void ; 
  errorMessage?: string;
} & HTMLProps<"textarea">;
type Ref = HTMLTextAreaElement;
type AllProps = React.ComponentPropsWithoutRef<"textarea"> & TextAreaProps;

const TextArea = forwardRef<Ref, AllProps>(function ({
  hint,
  label,
  name,
  className,
  required,
  disabled,
  onChange,
  setValue,
  errorMessage,
  ...props
}: TextAreaProps) {

  const id = useId();
  const hintId = hint ? `${id}-hint` : "";
  const errorMessageId = errorMessage ? `${id}-error-message` : "";

  return (
    <div className="grid">
      <Label name={name} required={required} >{label}</Label>
      <Hint id={hintId} hint={hint} />
      <div className={`${classes.wrapper.base} ${disabled && classes.wrapper.disabled} `}>
        <textarea
          name={name}
          id={id}
          className={` ${classes.textAreaElement.base}  ${disabled && classes.textAreaElement.disabled} `}
          aria-describedby={`${errorMessageId} ${hintId}` }
          aria-invalid={!!errorMessage}
          onChange={(e) => {
            setValue?.(e.target.value);
            onChange?.(e)
          }}
          {...props}
        >
          </textarea>
      </div>
      <div className="line-clamp-1" style={{height: 'var(--line-height)'}}>
        <ErrorMessage id={errorMessageId} >{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;

function Hint({ hint, id }) {
  if (!hint) return <></>;
  return (
    <p className={classes.hint} id={id}>
      {hint}
    </p>
  );
}

