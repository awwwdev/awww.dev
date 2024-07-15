import * as RadixTabs from "@radix-ui/react-tabs";

export default function Tabs({
  children,
  ...props
}: {
  children: React.ReactNode;
} & RadixTabs.TabsProps) {
  return (
    <RadixTabs.Root className=""  {...props}>
      {children}
    </RadixTabs.Root>
  );
}

const TabsList = (props: RadixTabs.TabsListProps) => (
  <RadixTabs.TabsList className={'TabsList' + props.className} {...props} />
);
TabsList.displayName = 'Tabs.TabsList';

const Content = (props: RadixTabs.TabsContentProps) => (
  <RadixTabs.Content className={"TabsContent" + props.className} {...props} />
);
Content.displayName = "Tabs.Content";

const Trigger = (props: RadixTabs.TabsTriggerProps) => (
  <RadixTabs.Trigger
    className={
      `px-6 py-2 px-6 py-2 select-none
      data-[state=active]:border-b-2 data-[state=active]:border-power-blue data-[state=active]:border-power-blue-brightest  ` +
      props.className
    }
    {...props}
  />
);
// Trigger.displayName = "Tabs.Trigger";

Tabs.Content = Content;
Tabs.Trigger = Trigger;
Tabs.TabsList = TabsList;
