import Button from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function useLocaleSwitcher() {
  const router = useRouter();

  const { locale: activeLocale } = router;

  
  
  const handleLocaleChange = () => {
    const otherLocale = activeLocale === "en" ? "fa" : "en";
    const { pathname, query } = router;
    router.push({ pathname, query }, undefined, { locale: otherLocale });
    document.documentElement.dir = otherLocale === "fa" ? "rtl" : "ltr";
  };
 return { handleLocaleChange}
}