type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type Number0to100 = IntRange<0, 101>;

type TransparencyStop = [Number0to100, Number0to100];

export default function GradientMask({
  direction,
  transparencyStops,
  children,
}: {
  direction: string;
  transparencyStops: TransparencyStop[];
  children?: React.ReactNode;
}) {
  return <div style={{ ...gradientMask({ direction, transparencyStops }) }}>{children}</div>;
}

export function gradientMask({ direction, transparencyStops }: { direction: string; transparencyStops: TransparencyStop[] }) {
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
