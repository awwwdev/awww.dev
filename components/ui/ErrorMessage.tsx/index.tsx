import Icon from "../Icon";

const classes = {
  messageText: "c-red11",
};

type ErrorMessageProps = {
  id: string;
  noPreStyle?: boolean;
  children?: React.ReactNode;
};

export default function ErrorMessage({ children, noPreStyle = false , id }: ErrorMessageProps) {
  if (!children) return <></>;
  return (
    <p id={id} className={` ${!noPreStyle && classes.messageText}`}>
      <Icon name="bf-i-ph-warning-hectagon" subdued={false} />
      <span>{children}</span>
    </p>
  );
}
