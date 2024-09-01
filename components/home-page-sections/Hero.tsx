import BluredCircle from "./BluredCircle";
import Image from "next/image";
import Space from "../ui/Space";
import { gradientMask } from "../ui/GradientMask";
import MouseCursor from "./MouseCursor";
import ProfilePicture from "@/public/profile-picture.png";
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
      <div className="absolute top-2 left-50% -translate-x-50% w-full overflow-clip select-none pointer-events-none">
        <DotGrid rows={24} cols={24} />
      </div>

      <BluredCircle radius={200} top="20%" left="85%" bg="bg-cyan2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-indigo2" blur="200px" />
      <div className="max-w-page mx-auto">
        <div>
          <div id="hero" />
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
          src={ProfilePicture}
          width={60}
          height={60}
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
        <span
          className="pr-4 bg-gradient-to-r from-transparent to-indigo3 select-none "
          style={{ gridArea: "1/1/-1/-1" }}
        >
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
      <MouseCursor />
    </span>
  );
}

function DevelopeWord() {
  return (
    <span style={{ fontSize: "1.1em" }} className="tracking-tighter">
      <span className="lt-md:leading-15 bg-gradient-to-r from-transparent via-cyan2A to-cyan2A pt-3 pb-2">
        <span className=" font-mono c-transparent bg-gradient-to-r from-base9 via-base11A to-sage12A bg-clip-text">
          develop
        </span>
      </span>
      <span className="lt-md:leading-15 bg-mint3A pt-3 pb-2 relative">
        <span className="font-mono c-mint12 ">e</span>
        <span className="absolute bottom-0 left-0 right-0 h-0.14em cursor-pulse c-mint12 opacity-40 blur-20"></span>
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
        <span
          className="stroke-text c-transparent "
          style={{
            gridArea: "1/1/-1/-1",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "var(--stroke-color, var(--rx-slate11A))",
            ...gradientMask({
              direction: "to right",
              transparencyStops: [
                [0, 100],
                [55, 50],
                [90, 0],
              ],
            }),
          }}
        >
          web{` `}
          <ApplicationWord />
        </span>
        <span
          role="none"
          className=" c-base12   select-none"
          style={{
            gridArea: "1/1/-1/-1",
            ...gradientMask({
              direction: "to right",
              transparencyStops: [
                [20, 0],
                [40, 10],
                [55, 40],
                [85, 100],
              ],
            }),
          }}
        >
          web{` `}
          <ApplicationWord />
        </span>
      </span>
    </span>
  );
}

function ApplicationWord() {
  return (
    <>
      <span className="lt-xxs:hidden">applications.</span>
      <span className="xxs:hidden">apps.</span>
    </>
  );
}

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
    <div className=" grid items-center justify-items-center  ">
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div className=" w-120 h-120  md:w-120 md:h-120 relative lt-md:hidden">
          <Sparkle className="w-6 h-6 opacity-100  absolute top-18.5% left-70% -translate-y-50% -translate-x-50%" />
          <Sparkle className="w-5 h-5 opacity-80  absolute top-28% left-38% -translate-y-50% -translate-x-50%" />
          <Sparkle className=" w-6 h-6 opacity-7f0  absolute top-20% left-10% -translate-y-50% -translate-x-50%" />
        </div>
        <div className=" w-120 h-120 opacity-60  md:w-120 md:h-120 relative md:hidden">
          <Sparkle className="sm:hidden  w-5 h-5 opacity-80  absolute top-4% left-69% -translate-y-50% -translate-x-50%" />
          <Sparkle className="w-6 h-6 opacity-60  absolute top-36% left-98% -translate-y-50% -translate-x-50%" />
          <Sparkle className=" w-6 h-6 opacity-60  absolute top-90% left-80% -translate-y-50% -translate-x-50%" />
          <Sparkle className=" w-4 h-4 opacity-50  absolute top-99% left-62% -translate-y-50% -translate-x-50%" />
        </div>
      </div>
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/15 rd-full w-120 h-120   md:w-120 md:h-120 md:-rotate-30 "
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [20, 50],
                [70, 0],
                [90, 30],
                [100, 0],
              ],
            }),
          }}
        ></div>
      </div>
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/15 rd-full    w-90 h-90 md:-rotate-30"
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [30, 50],
                [70, 0],
                [90, 30],
                [100, 0],
              ],
            }),
          }}
        ></div>
      </div>
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/10 rd-full w-60 h-60 md:w-60 md:h-60 md:-rotate-30"
          style={{
            ...gradientMask({
              direction: "to bottom",
              transparencyStops: [
                [0, 100],
                [30, 50],
                [50, 0],
                [80, 30],
                [100, 10],
              ],
            }),
          }}
        ></div>
      </div>
    </div>
  );
}

function Sparkle({ className }) {
  return (
    <div className="animate-pulse ">
      <div
        className={` ${className} `}
        style={{
          backgroundImage: "url('/decorative/sparkle.svg')",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}
