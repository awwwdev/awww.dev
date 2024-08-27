import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { En, Fa } from "../multilang";
import Icon from '../Icon';

const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={`flex flex-wrap items-center gap-1 break-words text-2xs sm:text-xs text-muted-foreground  ${className}`}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={`inline-flex items-center gap-1.5 ${className}`} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={`c-base11 transition-colors hover:text-foreground ${className}`} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`font-normal text-foreground ${className}`}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={`[&>svg]:size-3.5 ${className}`} {...props}>
    {children ?? (
      <>
        
          <Icon name="bf-i-ph-caret-left" />
        
        
          <Icon name="bf-i-ph-caret-right" />
        
      </>
    )}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    <div className="w-4 h-4">
      <Icon name="bf-i-ph-dots-three"/>
    </div>
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

type Step = {
  href: string;
  title: string;
};

export default function Breadcrumb({ steps }: { steps: Step[] }) {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {steps &&
          steps.length > 0 &&
          steps.map((step, index) => {
            return (
              <React.Fragment key={`breac-crumb-item-${index}`}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem >
                  <BreadcrumbLink href={step.href}>{step.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
