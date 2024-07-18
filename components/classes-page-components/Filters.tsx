import Checkbox from "../ui/Checkbox";
import DesktopOnly from "../ui/DesktopOnly";
import Fieldset from "../ui/Fieldset";
import Icon from "@/components/ui/Icon";
import MobileOnly from "../ui/MobileOnly";
import Space from "../ui/Space";
import { useRouter } from "next/router";
import { En, Fa } from "../ui/multilang";
import { useState } from "react";

export default function Filters({ onCheckboxChange, filters }) {
  return (
    <>
      <MobileOnly>
        <MobileFilters onCheckboxChange={onCheckboxChange} filters={filters} />
      </MobileOnly>
      <DesktopOnly>
        <DesktopFilters onCheckboxChange={onCheckboxChange} filters={filters} />
      </DesktopOnly>
    </>
  );
}

function MobileFilters({ onCheckboxChange, filters }) {
  const router = useRouter();
  const { locale } = router;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full ">
      <details
        className=""
        open={isOpen}
        onToggle={(e) => {
          setIsOpen(e.target.open);
        }}
      >
        <summary className=" flex items-center justify-between font-medium text-lg gap-2 w-full py-2">
          <span>
            <Icon name="bf-i-ph-sliders-horizontal" className='mie-1' />
            <span className='c-sand11'>
            filters
            پالانه‌ها
            </span>
          </span>
          <span className='px-2'>{isOpen ? <Icon name="bf-i-ph-caret-up" /> : <Icon name="bf-i-ph-caret-down " />}</span>
        </summary>

        <div className={`  sm:text-xl  p-4 sm:p-8 rd-b-4`}>
          <FilterControls {...{ onCheckboxChange, filters }} />
        </div>
      </details>
      {/* <Icon name="bf-i-ph-sort-ascending"/>
      <Icon name="bf-i-ph-sort-ascending"/> */}
      <hr />
    </div>
  );
}

function DesktopFilters({ onCheckboxChange, filters }) {
  const { locale } = useRouter();
  return (
    <div className="   b-is-1 sticky top-0 py-4">
      <div className="pis-6">
        <Space size="h-2" />
        <h2 className="">
          <Icon name="bf-i-ph-sliders-horizontal" subdued={false} />
          Filters
          پالانه‌ها
        </h2>
        <Space size="h-8" />
      <FilterControls {...{ onCheckboxChange, filters }} />
      </div>
    </div>
  );
}

function FilterControls({ onCheckboxChange, filters }) {
  const { locale } = useRouter();

  return (
    <div>
      <Fieldset legend={locale === "en" ? "Age Group " : "'گروه سنی"}>
        <Checkbox
          label={locale === "en" ? "Pre Schooler" : "پیش مدرسه‌ای"}
          value="Preschooler"
          filterGroup="ageGroup"
          checked={filters.ageGroup.includes("Preschooler")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Children" : "کودک"}
          value="Children"
          filterGroup="ageGroup"
          checked={filters.ageGroup.includes("Children")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Youth" : "نوجوان"}
          value="Youth"
          filterGroup="ageGroup"
          checked={filters.ageGroup.includes("Youth")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Adult" : "بزرگسال"}
          value="Adult"
          filterGroup="ageGroup"
          checked={filters.ageGroup.includes("Adult")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Senior" : "سالمند"}
          value="Senior"
          filterGroup="ageGroup"
          checked={filters.ageGroup.includes("Senior")}
          onChange={onCheckboxChange}
        />
      </Fieldset>
      <Space size="h-4" />
      <Fieldset legend={locale === "en" ? "English Fluency" : "تسلط آموزگار به انگلیسی"}>
        <Checkbox
          label={locale === "en" ? "Beginner" : "کم"}
          value="Beginner"
          filterGroup="englishFluency"
          checked={filters.englishFluency.includes("Beginner")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Intermediate" : "متوسط"}
          value="Intermediate"
          filterGroup="englishFluency"
          checked={filters.englishFluency.includes("Intermediate")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Advanced" : "پیشرفته"}
          value="Advanced"
          filterGroup="englishFluency"
          checked={filters.englishFluency.includes("Advanced")}
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={locale === "en" ? "Fluent" : "روان"}
          value="Fluent"
          filterGroup="englishFluency"
          checked={filters.englishFluency.includes("Fluent")}
          onChange={onCheckboxChange}
        />
      </Fieldset>
    </div>
  );
}
