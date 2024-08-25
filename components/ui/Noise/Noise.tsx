import { CSSProperties } from 'react';

export type NoiseProps = {
  style?: CSSProperties,
  className?: string,
  opacity?: string,
  frequency?: string,
  numOctaves?: string
} 

export default function Noise({ frequancy= '1.2', numOctaves = '6' , style = {} , className = ""}) {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg style='opacity:0.12;' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' width='200px' height='200px'  %3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${frequancy}' numOctaves='${numOctaves}' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        filter: 'grayscale(1)',
        ...style,
      }}
      className={className}
    />
  );
}



{/* <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><filter id="on34zdm03pv45y"><feTurbulence type="fractalNoise" baseFrequency="0.26" numOctaves="4.6" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#on34zdm03pv45y)" opacity="0.53" /></svg> */}