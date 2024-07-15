import { useRouter } from 'next/router';

export function Fa({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { locale } = router;
  if (locale === "fa") return <>{children}</>;
  return <></>;
}

export function En({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { locale } = router;

  if (locale === "en") return <>{children}</>;
  return <></>;
}
