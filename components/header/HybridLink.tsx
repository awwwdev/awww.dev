"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HybridLink({ pageUrl,  inSamePageHref, href , children , className , style = {}}) {
  const pathname = usePathname();
  if (pathname === pageUrl) {
    return (
      <a href={inSamePageHref} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} >
      {children}
    </Link>
  );
}
