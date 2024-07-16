type Props = {
  className?: string;
  style?: React.CSSProperties;
  wrapped?: boolean;
  color?: "orange" | "inherit";
};

export default function LoadingSpinner({ className, wrapped = false, color = 'orange' }: Props) {
  return (
    <Wrapper wrapped={wrapped}>
      {` `}
      <span
        className={`bf-i-svg-spinners:3-dots-bounce  before:opacity-80
        !mie-0 inline-flex justify-center items-center
        ${color === "orange" ? "c-brand-accent" : ""}
        ${className} `}
      ></span>
      {` `}
    </Wrapper>
  );
}

function Wrapper({ wrapped, children }) {
  if (!wrapped) return <>{children}</>;
  return <div className="flex w-full justify-center items-center min-h-30">{children}</div>;
}
