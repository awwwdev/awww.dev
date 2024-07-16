import React from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import * as RadixTypes from '@radix-ui/react-toggle-group';
import { Children } from '@/types';

export default function ToggleGroup({ children, type,  value, setValue, legend, className, ...props }: Children & any) {
  return (
    <RadixToggleGroup.Root
      aria-label={legend}
      type={type ??'single'}
      value={value}
      onValueChange={(v) => setValue(v)}
      className={`   b-accent6  ${className}`}
      {...props}
      
    >
      {legend && <span className='block fw-400 text-sm c-base11 mt-0.5em font-display fw-300'>{legend}</span>}
      <div className='flex gap-0.4em flex-wrap '>{children}</div>
    </RadixToggleGroup.Root>
  );
}

ToggleGroup.displayName = 'ToggleGroup';

function Item({
  children,
  className,
  preStyled = true,
  ...props
}: { preStyled?: boolean } & Children & RadixTypes.ToggleGroupItemProps) {
  return (
    <RadixToggleGroup.Item
      // className={`px-2 py-1  b-1  b-accent6 c-mauve11 bg-accent2 rd-2
      // hover:bg-accent3  hover:b-accent7
      // data-[state=on]:bg-accent6 data-[state=on]:c-accent12  ${className}`}
      className={`${preStyled &&
        `px-0.5em pt-0.125em pb-0.175em  b-1  b-base5 c-mauve11 bg-base1 rd-1.2 select-none
      data-[state=inactive]:hover:bg-base3  data-[state=inactive]:hover:b-base6
      data-[state=off]:hover:bg-base3  data-[state=off]:hover:b-base6
      data-[state=active]:bg-accent3  data-[state=active]:c-accent11 data-[state=active]:b-accent8
      data-[state=on]:bg-accent3  data-[state=on]:c-accent11 data-[state=on]:b-accent8
      `}
       ${className}`}
      {...props}
    >
      {children}
    </RadixToggleGroup.Item>
  );
}

ToggleGroup.Item = Item;
