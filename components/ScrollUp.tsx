import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ScrollUp() {
  const router = useRouter();
  const { asPath } = router;
  useEffect(() => {
  console.log('dfdfdd')
    window.document.scrollingElement?.scroll(0, 0);
  }, [asPath]);

  return null;
}
