type Args = {
  integer: number;
  cents: number;
};
type Props = {
  children?: (args: Args) => React.ReactNode;
  [key: string]: any;
  amount: number;
};

const Price = ({ children, amount }: Props) => {
  if (typeof children === "function") {
    const cents = Number(Number(amount).toFixed(2)) % 10;
    const integer = Number(Number(amount).toFixed(2)) - cents;
    return (
      <>
        <span className="sr-only">{Number(amount).toFixed(2)} US Dollar</span>
        {children({ integer, cents })}
      </>
    );
  }

  return (
    <>
      <span className="sr-only">{Number(amount).toFixed(2)} US Dollar</span>
      <span className="" aria-hidden="true">
        ${Number(amount).toFixed(2)}
      </span>
    </>
  );
};
