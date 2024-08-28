import { CSSProperties } from 'react';

// Usage:
// Add relative class to the parrent. 
// the paretnt shouldn't any border. 

export default function GradientBorderOverlay({
  from = "from-slate4A",
  to = "to-slate3A",
  via = "via-slate2A",
  direction = 'to bottom',
  borderWidth = "b-1",
  mixBlendMode = "mix-blend-screen"
}) {
  return (
    <div
      style={{
        // gridArea: "1/1/-1/-1",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: "inherit",
        // overflow: 'clip',
        // borderWidth: 'inherit',
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundClip: "border-box",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor" /*5'*/,
        maskComposite: "exclude" /*5*/,
        backdropFilter: "blur(5px)",
        "--un-gradient-shape": direction
        // zIndex: 9,
      } as CSSProperties}
      className={` bg-gradient-to-br ${from} ${via} ${to} ${borderWidth} ${mixBlendMode} `}
    ></div>
  );
}