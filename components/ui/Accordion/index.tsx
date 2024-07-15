import * as RadixAccordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import type { AccordionSingleProps } from '@radix-ui/react-accordion';
import { CLS } from '@/types';
export default function Accordion({
  children,
  className,
  noPreStyle,
  defaultValue,
  ...props
}: {
  defaultValue: string;
  children: React.ReactNode;
} & CLS) {
  return (
    <RadixAccordion.Root
      className={clsx(noPreStyle && '', '')}
      defaultValue={defaultValue}
      collapsible
      {...props}
      type='single'
    >
      {children}
    </RadixAccordion.Root>
  );
}

const Item = ({
  label,
  children,
  noPreStyle,
  className,
  value,
}: {
  value: string;
  label: React.ReactNode;
  children: React.ReactNode;
} & CLS) => {
  return (
    <RadixAccordion.Item className='AccordionItem' value={value}>
      <RadixAccordion.Header className='AccordionHeader'>
        <RadixAccordion.Trigger
          className={clsx(
            noPreStyle &&
              `px-6 py-2 px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-power-blue data-[state=active]:border-power-blue-brightest`,
            className
          )}
        >
          {/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
          {label}
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={clsx('')}>
        <div className=''>{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

Item.displayName = 'Accordion.Item';

Accordion.Item = Item;
