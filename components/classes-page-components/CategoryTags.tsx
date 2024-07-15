import { useRouter } from "next/router";
import LinkButton from "../ui/button/LinkButton";
import Icon from "@/components/ui/Icon";
import Link from 'next/link';

export default function CategoryTags() {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-baseline">
      <ul className="flex sm:gap-1.5 md:gap-2 items-baseline justify-start overflow-x-auto pb-2">
        <Tag
          href="/classes"
          icon="bf-i-ph-squares-four"
          activeIcon="bf-i-ph-squares-four-fill"
          label="All"
          labelFa="همه"
          activeInSubPath={false}
        />
        <Tag
          href="/classes/art"
          icon="bf-i-ph-palette"
          activeIcon="bf-i-ph-palette-fill"
          label="Art"
          labelFa="هنر"
        />
        <Tag
          href="/classes/music"
          icon="bf-i-ph-music-note"
          activeIcon="bf-i-ph-music-note-fill"
          label="Music"
          labelFa="موسیقی"
        />
        <Tag href="/classes/programming" icon="bf-i-ph-code" activeIcon="bf-i-ph-code-fill" label="Coding" labelFa="همه" />
        <Tag
          href="/classes/farsi"
          icon="bf-i-ph-book-open-text"
          activeIcon="bf-i-ph-book-open-text-fill"
          label="Farsi"
          labelFa="فارسی"
        />
        <Tag
          href="/classes/language"
          icon="bf-i-ph-translate"
          activeIcon="bf-i-ph-translate-fill"
          label="Language"
          labelFa="زبان"
        />
        <Tag
          href="/classes/sport"
          icon="bf-i-ph-football"
          activeIcon="bf-i-ph-football-fill"
          label="Sport"
          labelFa="ورزش"
        />
        <Tag href="/classes/science" icon="bf-i-ph-atom" activeIcon="bf-i-ph-atom-fill" label="Science" labelFa="علوم" />
        <Tag href="/classes/chess" icon="bf-i-ph-horse" activeIcon="bf-i-ph-horse-fill" label="Chess" labelFa="شطرنج" />
      </ul>
    </div>
  );
}

function Tag({ label, href, icon, activeIcon = "", activeInSubPath = true, labelFa }) {
  const router = useRouter();
  let isInPath = href === router?.asPath;
  let isInSubPath = isInPath === false && router?.asPath?.startsWith(href as string);
  let isActive = isInPath || (activeInSubPath && isInSubPath);
  return (
    <Link
      href={href}
      // variation={"text"}
      className={` flex flex-col items-center gap-3  hover:bg-sand3 py-2  rd-3 !lt-sm:px-2 sm:px-3 md:px-3.5 
      `}
    >
      <Icon
        subdued={!isActive}
        name={isActive ? activeIcon : icon}
        className={`text-xl sm:text-2xl md:text-3xl  ${isActive && "c-brand-orange"}`}
      />
      <span className={` ${isActive ? "c-orange11" : "c-sand11"} text-xs  sm:text-sm md:text-base `}>
        {router.locale === "en" ? label : labelFa}
      </span>
    </Link>
  );
}

function TagAlt2({ label, href, icon }) {
  const router = useRouter();
  let isInPath = href === router?.asPath;
  let isInSubPath = isInPath === false && router?.asPath?.startsWith(href as string);
  let isActive = isInPath || isInSubPath;
  return (
    <LinkButton
      href={href}
      variation={isActive ? "solid-accent" : "text"}
      className={`${icon} ${isActive ? "before:opacity-100" : "bg-sand3 hover:bg-sand4"} 
      flex items-center !rd-full 
      `}
    >
      {label}
    </LinkButton>
  );
}
