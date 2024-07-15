import NextLink from "next/link";
import { useRouter } from "next/router";
import type { LinkProps } from "next/link";

const Lnk = (props: LinkProps & { children: React.ReactNode; className?: string; title?: string }) => {
  const router = useRouter();
  let isInPath = props.href === router?.asPath;
  let isInSubPath = isInPath === false && router?.asPath?.startsWith(props.href as string);
  if (isInPath) return <NextLink {...props} data-in-path aria-current='page' />;
  if (isInSubPath) return <NextLink {...props} data-in-sub-path />;
  return <NextLink {...props} />;
};

export default Lnk;
