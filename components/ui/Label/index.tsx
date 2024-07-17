
const classes = {
  labelText: "capitalize",
  requiredStar: "mis-1 c-red11",
};

type LabelProps = {
  preStyled?: boolean;
  children?: React.ReactNode;
  name: string;
  required?: boolean;
};

export default function Label({ children, name , required,  preStyled = true }: LabelProps) {
  if (!children) return <></>;
  return (
    <label htmlFor={name}>
      <span className={` ${preStyled && classes.labelText} `}>{children}</span>
      {required && <span aria-hidden={true} className={classes.requiredStar}>*</span>}
    </label>
  );
}
