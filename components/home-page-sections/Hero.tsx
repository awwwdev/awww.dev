import BluredCircle from "./BluredCircle";
import Image from "next/image";
import Space from "../ui/Space";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";
import { gradientMask } from "../ui/GradientMask";

export default function Hero() {
  return (
    <div className="">
      <DesktopHero />
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="relative ">
      <div className="absolute top-2 left-50% -translate-x-50% w-full overflow-clip">
        <DotGrid rows={24} cols={24} />
      </div>

      <BluredCircle radius={200} top="20%" left="85%" bg="bg-cyan2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-indigo2" blur="200px" />
      <div className="max-w-page mx-auto">
        <div>
          <Space size="h-6 sm:h-20" />
          <Greeting />
          <Space size="h-6 md:h-20" />
          <HeroSentence />
        </div>
      </div>
    </section>
  );
}

function Greeting() {
  return (
    <div className="flex  md:justify-center">
      <div className="grid md:flex flex-row gap-4 md:gap-6 items-center w-fit     ">
        <Image
          src="/profile-picture.png"
          width={200}
          height={200}
          className={`object-cover w-15 h-15 rd-full bg-gradient-to-br from-blue2 to-green2  shadow-2xl z-10`}
          alt=""
          priority
        ></Image>
        <p className="font-display fs-xl sm:fs-2xl tracking-wider line-height-0.8">Hello. I&apos;m Hamid.</p>
      </div>
    </div>
  );
}

function HeroSentence() {
  return (
    <div className="relative ">
      <div
        className={`absolute top-1/2 -translate-y-1/2  
        md:left-1/2 -translate-x-1/2 
        lt-md:left-0
         `}
      >
        <Circles />
      </div>
      <p
        className={`
         lt-md:grid justify-start justify-items-start items-start content-center
         font-display fs-5xl sm:fs-6xl 
         md:text-center 
         `}
      >
        <span className="whitespace-nowrap">
          <IWord />
          {` `}
          <DesignWord />
        </span>
        {` `}
        <AndWord />
        {` `}
        <DevelopeWord />
        <WebApplicationsWord />
      </p>
    </div>
  );
}

function IWord() {
  return <span className="c-base10 blur-1 ">I</span>;
}

function DesignWord() {
  return (
    <span className="relative leading-20">
      <span className="inline-grid ">
        <span className="pr-4 dashed-border-box  fade-to-l select-none" style={{ gridArea: "1/1/-1/-1" }}>
          <span className="invisible" role="heading">
            design
          </span>
        </span>
        <span className="pr-4 bg-gradient-to-r from-transparent to-indigo3 select-none " style={{ gridArea: "1/1/-1/-1" }}>
          <span className="invisible " role="heading">
            design
          </span>
        </span>
        <span
          className="pr-4 c-transparent bg-clip-text bg-gradient-to-r from-slate9 to-slate12 "
          style={{ gridArea: "1/1/-1/-1" }}
        >
          design
        </span>
      </span>

      <span role='none' className="absolute right-0 bottom-0  leading-1 translate-x-55% translate-y-55% w-0.6em h-0.6em c-blue12A  ">
        <PointerSVG />
      </span>
    </span>
  );
}

function PointerSVG() {
  return (
    <svg className=" " viewBox="0 0 715 727" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M480.109 419.221L541.97 390.586C658.516 336.636 716.79 309.662 714.93 268.172C713.07 226.682 652.617 205.03 531.71 161.726L198.792 42.4868C94.354 5.08088 42.1349 -13.6221 14.4457 13.5169C-13.2435 40.6558 4.40758 93.2398 39.7098 198.408L39.7099 198.408L154.548 540.52C195.612 662.853 216.144 724.019 257.68 726.637C299.215 729.255 327.265 671.151 383.365 554.943L420.635 477.738L420.635 477.737C430.17 457.986 434.937 448.111 442.596 440.576C450.254 433.041 460.205 428.434 480.109 419.221Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DevelopeWord() {
  return (
    <span style={{ fontSize: "1.1em" }}>
      <span className="lt-md:leading-15 bg-gradient-to-r from-transparent via-cyan2A to-cyan2A pt-3 pb-2">
        <span className="tracking-tight font-mono c-transparent bg-gradient-to-r from-sage9 to-sage12A bg-clip-text">
          develop
        </span>
      </span>
      <span className="lt-md:leading-15 bg-mint3A pt-3 pb-2 relative">
        <span className="font-mono c-mint12 ">e</span>
        <span className="absolute bottom-0 left-0 right-0 h-0.14em cursor-pulse c-mint12"></span>
      </span>
    </span>
  );
}


function AndWord() {
  return <span className="blur-1 c-base10">and</span>;
}

function WebApplicationsWord() {
  return (
    <span className="relative  ">
      <span className="sr-only">web applications</span>
      <span className="grid">
        <span className="stroke-text c-transparent fade-to-r  " style={{ gridArea: "1/1/-1/-1" }}>
          web{` `}
         <ApplicationWord />
        </span>
        <span role="none" className=" c-base10  fade-to-l select-none" style={{ gridArea: "1/1/-1/-1" }}>
          web{` `}
         <ApplicationWord />
        </span>

        <span
          role="none"
          className=" stroke-text c-transparent fade-to-l select-none"
          style={{ "--stroke-color": "white", gridArea: "1/1/-1/-1" }}
        >
          web{` `}
          <ApplicationWord />
        </span>
      </span>
    </span>
  );
}

function ApplicationWord(){

return (
  <>
  <span className='lt-xxs:display-none' >
applications
  </span>
  <span className='xxs:display-none'>
    apps
  </span>
  </>
)};

// function TogglePlate() {
//   return (
//     <Plate>
//       <div className="grid gap-1.5">
//         <Switch />
//       </div>
//     </Plate>
//   );
// }

// function ColorPalettePlate() {
//   return (
//     <Plate>
//       <div className="flex gap-1.5">
//         <ColorNode className="bg-blue1" />
//         <ColorNode className="bg-blue2" />
//         <ColorNode className="bg-blue3" />
//         <ColorNode className="bg-blue4" />
//         <ColorNode className="bg-blue5" />
//         <ColorNode className="bg-blue6" />
//         <ColorNode className="bg-blue7" />
//         <ColorNode className="bg-blue8" />
//         <ColorNode className="bg-blue9" />
//       </div>
//     </Plate>
//   );
// }

// function ColorNode({ className }) {
//   return <div className={`${className} w-5 h-5 rd-full `}></div>;
// }

// function MusicPlayerPlate() {
//   return (
//     <Plate>
//       <div>
//         <div className=" flex gap-3 items-center">
//           <Button variation="soft" iconButton rounded className="fs-sm">
//             <Icon name="bf-i-ph-skip-back" />
//           </Button>
//           <Button variation="solid" iconButton rounded className="fs-xl">
//             <Icon name="bf-i-ph-play" />
//           </Button>
//           <Button variation="soft" iconButton rounded className="fs-sm">
//             <Icon name="bf-i-ph-skip-forward" />
//           </Button>
//         </div>
//         <div>{/* <Slider /> */}</div>
//       </div>
//     </Plate>
//   );
// }

// function CodePlate() {
//   return (
//     <Plate>
//       <div className="">
//         <div className="bg-base5 -mx-4 -mt-4 rd-t-4 mb-4  h-8 min-w-50"></div>
//         <code>
//           <pre>
//             &lt;div&gt;
//             <br />
//             ...
//             <br />
//             &lt;/div&gt;
//           </pre>
//         </code>
//       </div>
//     </Plate>
//   );
// }

// function FontSample({ className, size }) {
//   return (
//     <div className="">
//       <div className="flex flex-col gap-1 items-center">
//         <div className={`font-display ${className} h-10 flex items-end`}>Aa</div>
//         <div className="text-xs c-base11">{size}</div>
//       </div>
//     </div>
//   );
// }

// function Plate({ children }) {
//   return <div className="p-4 rd-4 shadow-lg bg-sand3 w-fit">{children}</div>;
// }

function DotGrid({ rows, cols }) {
  return (
    <div
      className="grid aspect-ratio-1/1  justify-items-center fade-y w-full min-w-50rem"
      style={{
        gridTemplateColumns: `repeat(${cols} , 1fr)`,
        gridTemplateRows: `repeat(${rows} , 1fr)`,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 40%, transparent 60%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 40%, transparent 60%)",
      }}
    >
      {Array.from(Array(rows * cols).keys()).map((i) => {
        return <div key={`dot-${i}`} className={`rd-full bg-white/10 w-1 h-1 `}></div>;
      })}
    </div>
  );
}

function Circles() {
  return (
    <div className=" grid items-center justify-items-center md:-rotate-30 ">
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/20 rd-full w-120 h-120   md:w-120 md:h-120"
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [20, 50],
                [70, 0],
                [90, 50],
                [100, 10],
              ],
            }),
          }}
        ></div>
      </div>
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/20 rd-full    w-90 h-90"
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [30, 50],
                [70, 0],
                [90, 60],
                [100, 10],
              ],
            }),
          }}
        ></div>
      </div>
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/20 rd-full w-60 h-60 md:w-60 md:h-60"
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [30, 50],
                [50, 0],
                [80, 70],
                [100, 10],
              ],
            }),
          }}
        ></div>
      </div>
    </div>
  );
}
