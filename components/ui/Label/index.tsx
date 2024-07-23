
const classes = {
  labelText: "capitalize",
  requiredStar: "mis-1 c-red11",
};

type LabelProps = {
  noPreStyle?: boolean;
  children?: React.ReactNode;
  name: string;
  required?: boolean;
};

export default function Label({ children, name , required,  noPreStyle = false }: LabelProps) {
  if (!children) return <></>;
  return (
    <label htmlFor={name}>
      <span className={` ${!noPreStyle && classes.labelText} `}>{children}</span>
      {required && <span aria-hidden={true} className={classes.requiredStar}>*</span>}
    </label>
  );
}
