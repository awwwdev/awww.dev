import { Children } from '@/types';

export default function Fieldset({ legend, id, children }: Children & { id?: string; legend: string }) {
  return (
    <fieldset id={id}>
      <div className='flex items-center gap-2'>
        <legend className=' '>{legend}</legend>
        <div className='h-1px bg-base5 grow'></div>
      </div>
      <div className='h-2'></div>
      <div className=''>{children}</div>
    </fieldset>
  );
}
