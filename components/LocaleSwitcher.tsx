import { useRouter } from "next/router";
import { En, Fa } from "./ui/multilang";
import Button from "./ui/button";
import Icon from "./ui/Icon";

export default function LocaleSwitcher() {
  const router = useRouter();

  const { locale: activeLocale } = router;

  const otherLocale = activeLocale === "en" ? "fa" : "en";

  const handleLocaleChange = (newLocale) => {
    const { pathname, query } = router;
    router.push({ pathname, query }, undefined, { locale: newLocale });
    document.documentElement.dir = newLocale === "fa" ? "rtl" : "ltr";
  };

  return (
    <Button variation="text" onClick={() => handleLocaleChange(otherLocale)} className="!fw-400  !px-0.5em" width='content'>
      <Fa>English</Fa>
      <En>فارسی</En>
      <Icon name="bf-i-ph-globe-simple" className='mis-1' />
    </Button>
  );
}
