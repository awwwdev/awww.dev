import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Space from "../ui/Space";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";

export default function Hero() {
  return (
    <div>
      <DesktopHero />
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="relative ">
      <BluredCircle radius={200} top="20%" left="85%" bg="bg-cyan2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-indigo2" blur="200px" />
      <div className="max-w-page mx-auto">
        <div>
          <Space size="h-6 sm:h-20" />
          <div className="flex justify-center">
            <div className="flex flex-row gap-3 sm:gap-8 items-center w-fit     ">
              <Image
                src="/profile-picture.png"
                width={200}
                height={200}
                className={`object-cover w-15 h-15 rd-full bg-sand3 `}
                alt=""
                priority
              ></Image>
              <p className="font-display fs-xl sm:fs-2xl tracking-wide  line-height-0.8">Hello. I&apos;m Hamid.</p>
            </div>
          </div>
          <Space size="h-6 sm:h-20" />
          <HeroSentence />
          <Space size="h-10 sm:h-30" />
        </div>
      </div>
    </section>
  );
}

function HeroSentence() {
  return (
    <p className="font-display fs-4xl sm:fs-6xl text-center">
      <span className="block">
        <IWord />
        {` `}
        <DesignWord />
        {` `}
        <AndWord />
        {` `}
        <DevelopeWord />
      </span>
      <WebApplicationsWord />
    </p>
  );
}

function IWord() {
  return <span className="c-base10 blur-1 ">I</span>;
}

function DesignWord() {
  return (
    <span className=" relative bg-gradient-to-r from-transparent to-indigo3  pt3 pb-2  ">
      <span className="dashed-border-box p-3 pb-2">design</span>
      <span className="absolute right-0 bottom-0  leading-1 translate-x-50% translate-y-50% w-0.5em h-0.5em c-indigo12A ">
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
    <span className="bg-cyan2A pt3 pb-2">
      <span className="tracking-tight  ">
        <span className="font-mono c-sage12A ">develop</span>
        <span className="bg-mint3A  pt-3 pb-2 relative">
          <span className="font-mono c-mint12">e</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.14em cursor-pulse c-mint12"></span>
        </span>
      </span>
    </span>
  );
}

function AndWord() {
  return <span className="blur-1 c-base10">and</span>;
}

function WebApplicationsWord() {
  return (
    <span className="relative blur-1 c-base10">
      <span className="">
        web{` `}
        <DesktopOnly>applications.</DesktopOnly>
        <MobileOnly>apps.</MobileOnly>
      </span>
      <span className="absolute -right-0.1em top-0  leading-1 translate-x-20%  -translate-y-50% ">
        <Icon name="bf-i-ph-sparkle-fill" className="c-indigo12A fs-lg sm:fs-3xl  blur-2" />
      </span>
    </span>
  );
}

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

