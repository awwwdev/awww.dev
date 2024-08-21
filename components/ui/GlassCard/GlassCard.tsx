import { CSSProperties } from "react";
import Noise from "../Noise";
import { NoiseProps } from '../Noise/Noise';

type Props = {
  children: React.ReactNode;
  classNames: {
    borderWidth?: string;
    borderColor?: string;
    borderGradient?: string;
    padding?: string;
    borderRadius?: string;
    shadowLayer?: string;
    noiseLayer?: string;
    backgroundLayer?: string;
    contentLayer?: string;
  };
};

export default function GlassCard({ children, classNames }: Props) {
  const cl = classNames;
  return (
    <div
      style={{
        display: "grid",
      }}
      className={`${cl.borderRadius} `}
    >
      <ShadowLayer className={`${cl.borderRadius} ${cl.shadowLayer}`} />
      <BackgroundLayer className={`${cl.backgroundLayer} ${cl.borderRadius} ${cl.borderWidth} `} />
      <NoiseLayer className={`${cl.noiseLayer} ${cl.borderRadius} ${cl.borderWidth} `} />
      <BorderLayer className={`${cl.borderGradient} ${cl.borderColor} ${cl.borderWidth}  ${cl.borderRadius}`} />
      <Content className={`${cl.contentLayer} ${cl.borderRadius} ${cl.borderWidth}`}>{children}</Content>
    </div>
  );
}

GlassCard.displayName = "GlassCard";

function Content({ style = {} as CSSProperties, className = "", children }) {
  return (
    <div
      style={{
        gridArea: "1/1/-1/-1",
        borderColor: "transparent",
        zIndex: 10,
        ...style,
      }}
      className={`${className}`}
    >
      {children}
    </div>
  );
}

function BackgroundLayer({ style = {}, className = "" }) {
  return (
    <div
      style={{
        gridArea: "1/1/-1/-1",
        borderColor: "transparent",
        backgroundClip: "padding-box", // for cleaner border layer
        // backgroundOrigin: 'padding-box',
        zIndex: 1,
        ...style,
      }}
      className={`${className}`}
    ></div>
  );
}

function ShadowLayer({ className }) {
  return (
    <div
      style={{
        gridArea: "1/1/-1/-1",
        borderColor: "transparent",
      }}
      className={`${className}`}
    ></div>
  );
}


function NoiseLayer({ className , style , ...rest }: NoiseProps) {
  return (
    <Noise
      style={{
        gridArea: "1/1/-1/-1",
        borderColor: "transparent",
        zIndex: 5,
        ...style
      }}
      className={className}
      // opacity='1'
      // numOctaves='7'
      // frequancy='0.8'
      {...rest}
    />
  );
}

function BorderLayer({ className }) {
  return (
    <div
      style={{
        gridArea: "1/1/-1/-1",
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundClip: "border-box",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor" /*5'*/,
        maskComposite: "exclude" /*5*/,
        backdropFilter: "blur(5px)",
        zIndex: 9,
      }}
      className={`${className}  `}
    ></div>
  );
}

GlassCard.Background = BackgroundLayer;
GlassCard.Shadow = ShadowLayer;
GlassCard.Noise = NoiseLayer;
GlassCard.GradientBorder = BorderLayer;
GlassCard.Content = Content;
