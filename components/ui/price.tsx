import { En, Fa } from "./multilang";

export default function Price({ children, currency }: { currency?: string; children?: React.ReactNode }) {
  return (
    <span>
      
        <span className='c-base11 fw-300'>CAD</span>
      
      {children}
      
        {` `}
        <span className='c-base11 fw-300'>دلار کانادا</span>
      
    </span>
  );
}
