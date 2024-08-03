import Space from '@/components/ui/Space';
import { useId } from 'react';

export default function Page(){

return (
  <div className='max-w-page mx-auto' >
    <Section title='Services' >
      
      <div>
        
      </div>
      </Section>   
  </div>
)};


function Section({ title, className = "", children }) {
  const headerId = useId();
  return (
    <section className={className} aria-labelledby={headerId}>
      <h1 className="H1" id={headerId}>
        {title}
      </h1>
      <Space size="h-8" />

      {children}

      <div className="b-t-2 b-sand5"></div>
    </section>
  );
}