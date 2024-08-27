import Icon from "../Icon";

const classes = {
  messageText: "c-red11",
};

type ErrorMessageProps = {
  id: string;
  preStyled?: boolean;
  children?: React.ReactNode;
};

export default function ErrorMessage({ children, preStyled = true , id }: ErrorMessageProps) {
  if (!children) return <></>;
  return (
    <p id={id} className={` ${preStyled && classes.messageText}`}>
      <Icon name="bf-i-ph-warning-octagon" subdued={false} />
      <span>{children}</span>
    </p>
  );
}
