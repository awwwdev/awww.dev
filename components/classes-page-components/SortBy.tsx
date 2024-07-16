import Icon from "@/components/ui/Icon";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/router";
import { En, Fa } from "../ui/multilang";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";

export default function SortBy({ onSortChange, filters }) {
  // const handleSortChange = (event) => {
  //   onSortChange(event.target.value);
  // };

  const { locale } = useRouter();
  return (
    <div>
      {/* <div className="px-2 py-1 rd-lg bg-transparent b-1 b-sand5">
        <label>
          <span className="mie-2 c-sand11">
            <Icon name="bf-i-ph-sort-ascending mie-1" />
            <span className="sr-only">Sort By</span>
          </span>
          <select className=" bg-transparent" onChange={handleSortChange}>
            <option value="random">
              <Icon name="bf-i-ph-sort-ascending mie-1" />
              Random
            </option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
          </select>
        </label>
      </div> */}

      <Select.Root
        onValueChange={(value) => onSortChange(value)}
        dir={locale === "fa" ? "rtl" : "ltr"}
        value={filters.sort}
      >
        <Select.Trigger
          className={`inline-flex  items-baseline  rd-2 px-2 py-2.5 leading-none  gap-4 b-1 b-sand5   hover:bg-sand3  data-[placeholder]:c-sand11 outline-transparent sm:min-w-45 min-w-9  lt-sm:justify-center
            focus-within:outline-brand-accent focus-within:outline-1px focus-within:outline-solid
            `}
          aria-label="Sort"
        >
          <DesktopOnly>
            <Select.Value placeholder={locale === "en" ? "Sort by ..." : "به ترتیب ..."} />
            <Select.Icon className="mis-auto">
              <Icon name="bf-i-ph-caret-down" />
            </Select.Icon>
          </DesktopOnly>
          <MobileOnly>
            <div className='flex'>
            {filters.sort === "random" && <Icon name="bf-i-ph-shuffle "  />}
            {filters.sort === "lowest-price" && <Icon name="bf-i-ph-sort-ascending"  />}
            {filters.sort === "highest-price" && <Icon name="bf-i-ph-sort-descending"  />}
            </div>
          </MobileOnly>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="start"
            position="popper"
            sideOffset={1}
            className="box-border  overflow-hidden bg-[#FCF9F7] rd-3 shd-tinted-3 "
          >
            <Select.Viewport className="p-2 min-w-45">
              <SelectItem value="random">
                <Icon name="bf-i-ph-shuffle " className="mie-2" />
                <Fa>بختوار</Fa>
                <En>Random</En>
              </SelectItem>
              <SelectItem value="lowest-price">
                <Icon name="bf-i-ph-sort-ascending " className="mie-2" />

                <Fa>کمترین قیمت</Fa>
                <En>Lowest Prce</En>
              </SelectItem>
              <SelectItem value="highest-price">
                <Icon name="bf-i-ph-sort-descending " className="mie-2" />
                <Fa>بیشترین قیمت</Fa>
                <En>Highest Price</En>
              </SelectItem>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={`
        leading-none  rd-2 flex items-center gap-6  px-2 py-2 relative select-none 
        data-[disabled]:c-melow 
        data-[disabled]:pointer-events-none 
        data-[highlighted]:outline-none 
        data-[highlighted]:bg-sand4
        data-[highlighted]:c-sand12
        ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="mis-auto inline-flex items-center justify-center">
        <Icon name="bf-i-ph-check" />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";
