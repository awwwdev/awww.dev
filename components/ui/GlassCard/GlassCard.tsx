import { CSSProperties } from "react";
import Noise from "../Noise";
import { NoiseProps } from '../Noise/Noise';

type Props = {
  children: React.ReactNode;
  className?: string;
  noiseLayer?: {
    opacity?: string,
    frequency?: string,
    numOctaves?: string
    className?: string
  };
  borderGradient?: string;
};

export default function GlassCard({ children, className, style ,noiseLayer  , borderGradient }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        isolation: 'isolate',
        borderColor: 'transparent',
        borderWidth: 0,
        ...style
      }}
      className={`${className} `}
    >
      {/* <ShadowLayer className={`${cl.borderRadius} ${cl.shadowLayer}`} /> */}
      {/* <BackgroundLayer className={`${cl.backgroundLayer} ${cl.borderRadius} ${cl.borderWidth} `} /> */}
      {/* <NoiseLayer className={`${noiseLayer?.className} `} numOctaves={noiseLayer?.numOctaves} frequency={noiseLayer?.frequency} /> */}
      <BorderLayer className={`${borderGradient} `} />
      {children}
    </div>
  );
}

GlassCard.displayName = "GlassCard";

function Content({ style = {} as CSSProperties, className = "", children }) {
  return (
    <div
      style={{
        // gridArea: "1/1/-1/-1",
        borderColor: "transparent",
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
        // gridArea: "1/1/-1/-1",
        // position: 'absolute',
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // gridArea: "1/1/-1/-1",
        borderRadius: 'inherit',
        borderColor: "transparent",
        borderWidth: 'inherit',
        // zIndex: 5,
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
        // gridArea: "1/1/-1/-1",
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 'inherit',
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
        // zIndex: 9,
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
