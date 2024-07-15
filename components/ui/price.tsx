import { En, Fa } from "./multilang";

export default function Price({ children, currency }: { currency?: string; children?: React.ReactNode }) {
  return (
    <span>
      <En>
        <span className='c-sand11 fw-300'>CAD</span>
      </En>
      {children}
      <Fa>
        {` `}
        <span className='c-sand11 fw-300'>دلار کانادا</span>
      </Fa>
    </span>
  );
}
