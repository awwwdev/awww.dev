import * as RadixAccordion from "@radix-ui/react-accordion";
import type { AccordionSingleProps } from "@radix-ui/react-accordion";
import { CLS } from "@/types";
export default function Accordion({
  children,
  className,
  preStyled,
  defaultValue,
  ...props
}: {
  defaultValue: string;
  children: React.ReactNode;
} & CLS) {
  return (
    <RadixAccordion.Root
      className={`${preStyled && ""} `}
      defaultValue={defaultValue}
      collapsible
      {...props}
      type="single"
    >
      {children}
    </RadixAccordion.Root>
  );
}

const Item = ({
  label,
  children,
  preStyled,
  className,
  value,
}: {
  value: string;
  label: React.ReactNode;
  children: React.ReactNode;
} & CLS) => {
  return (
    <RadixAccordion.Item className="AccordionItem" value={value}>
      <RadixAccordion.Header className="AccordionHeader">
        <RadixAccordion.Trigger
          className={`${
            preStyled &&
            `px-6 py-2 px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-power-blue data-[state=active]:border-power-blue-brightest`
          } ${className} `}
        >
          {/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
          {label}
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={` `}>
        <div className="">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

Item.displayName = "Accordion.Item";

Accordion.Item = Item;
