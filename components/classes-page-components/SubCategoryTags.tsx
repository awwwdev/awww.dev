import { useRouter } from 'next/router';
import LinkButton from '../ui/button/LinkButton';
import { useTranslation } from 'next-i18next';

export default function SubCategoriesTags({ subcategoryQ, categorySlug  }) {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  return (
    <>
      {subcategoryQ?.data && (
        <div className="">
          {/* <div className="h-2"></div> */}
          <ul className="flex flex-wrap gap-2 items-baseline  c-sand11 text-lg">
            <h2 className="text-sm c-sand11 sr-only ">Sub Categories</h2>
            <li>
            <SubTag
                  href={`/classes/${categorySlug}`}
                  label= {t("classes:all")}
                  icon=""
                  isActiveInSubpath={false}
                />
            </li>
            {subcategoryQ.data.map((subcategory) => (
              <li key={subcategory.id}>
                <SubTag
                  href={`/classes/${categorySlug}/${subcategory.id}`}
                  label={locale === "fa" ? subcategory.nameFa : subcategory.name}
                  icon=""
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}



function SubTag({ label, href, icon, isActiveInSubpath = true }) {
  const router = useRouter();
  let isInPath = href === router?.asPath;
  let isInSubPath = isInPath === false && router?.asPath?.startsWith(href as string);
  let isActive = isInPath || (isActiveInSubpath && isInSubPath ) ;
  return (
    <LinkButton
      href={href}
      variation={isActive ? "solid-accent" : "text"}
      className={`${icon} ${isActive ? "before:opacity-100" : "bg-sand3  hover:bg-sand4 "} 
        !rd-full 
      flex items-center 
      text-2xs sm:text-xs !lt-sm:py-1 !lt-sm:px-2
      `} 
    >
      {label}
    </LinkButton>
  );
}
