type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type Number0to100 = IntRange<0, 101>;
type StopPosition = Number0to100;
type StopTransparency = Number0to100;
type TransparencyStop = [StopPosition, StopTransparency];

export default function GradientMask({
  direction = 'to bottom',
  transparencyStops,
  children,
  className,
  style,
  disable,
}: {
  direction?: string;
  transparencyStops: TransparencyStop[];
  children?: React.ReactNode;
  className?: string,
  style?: React.CSSProperties
  disable?: boolean
}) {
  return <div className={className} style={{ ...style , ...gradientMask({ direction, transparencyStops , disable}) }}>{children}</div>;
}

export function gradientMask({ direction = 'to bottom', transparencyStops, disable }: { direction: string; transparencyStops: TransparencyStop[], disable?: boolean }) {
  if (disable) return {};
  const gradientStops = transparencyStops
    .map((tStop) => {
      return ` rgba(0 0 0 / ${tStop[1] / 100}) ${tStop[0]}%`;
    })
    .join(", ");

  return {
    maskImage: `linear-gradient(${direction}, ${gradientStops})`,
    WebkitMaskImage: `linear-gradient(${direction}, ${gradientStops})`,
  };
}
