import Image, { StaticImageData } from "next/image";
import GradientBorderOverlay from "../ui/GradientBorderOverlay";
import GradientMask from "../ui/GradientMask";

type Props = {
  title: string;
  subtitle: string;
  imgs: StaticImageData[];
  gradient: string;
  borderColor?: string;
  borderGradeintFrom: string;
  borderGradeintTo?: string;
}

export default function WorkItemCard({
  title,
  imgs,
  subtitle,
  gradient,
  borderGradeintFrom,
  borderGradeintTo,
}: Props) {
  return (
    <CardContainer {...{ title, gradient, borderGradeintFrom, borderGradeintTo }}>
      <CardContent title={title} subtitle={subtitle} imgs={imgs} />
    </CardContainer>
  );
}

export function CardContainer({ children, gradient, borderGradeintFrom, borderGradeintTo }) {
  return (
    <div className={`grid h-full `}>
      <div style={{ gridArea: "1/1/-1/-1" }} className={`p-8 -z-100`}>
        <CardGlow gradient={gradient} />
      </div>
      <div
        className={`h-full rd-3  grid overflow-clip  sahdow-2xl 
      bg-clip-padding grid  `}
        style={{
          gridArea: "1/1/-1/-1",
          // for border gradient
          position: "relative",
          isolation: "isolate",
          borderColor: "transparent",
          borderWidth: 0,
        }}
      >
        <GradientBorderOverlay from={borderGradeintFrom} via="via-slate2A" to="to-transparent" direction="135deg" />
        <GradientBorderOverlay
          from="from-transparent"
          via="via-slate2A"
          to={borderGradeintTo ?? "to-white/20"}
          direction="135deg"
        />
        <GlassFrostEffectLayer />
        <div
          className={` bg-gradient-to-b ${gradient}  h-full grid`}
          style={{
            gridTemplateRows: "auto 1fr",
            gridArea: "1/1/-1/-1",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CardGlow({ gradient }) {
  return (
    <div
      className={`h-full w-full bg-gradient-to-b rd-3 ${gradient}  mix-blend-screen blur-60 opacity-100 -z-100`}
    ></div>
  );
}

// function GradientBorderLayer({ borderGradeintFrom = "from-slate5A" }) {
//   return (
//     <div
//       style={{
//         // gridArea: "1/1/-1/-1",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         borderRadius: "inherit",
//         // overflow: 'clip',
//         // borderWidth: 'inherit',
//         borderStyle: "solid",
//         borderColor: "transparent",
//         backgroundClip: "border-box",
//         backgroundOrigin: "border-box",
//         WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
//         mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
//         WebkitMaskComposite: "xor" /*5'*/,
//         maskComposite: "exclude" /*5*/,
//         backdropFilter: "blur(5px)",
//         // zIndex: 9,
//       }}
//       className={` bg-gradient-to-br ${borderGradeintFrom} via-slate4A  to-white/20 b-1 mix-blend-screen `}
//     ></div>
//   );
// }

function GlassFrostEffectLayer() {
  return (
    <div
      className="-z-10"
      style={{
        gridArea: "1/1/-1/-1",
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        // backdropFilter: "blur(10px)",
      }}
    ></div>
  );
}

function CardContent({ title, subtitle, imgs }) {
  return (
    <>
      <div className="px-5 pt-5 xs:px-6  xs:pt-5 ">
        <h3 className={`H3 sm:H3 `}>{title}</h3>
        <p className="c-base11 text-sm">{subtitle}</p>
      </div>
      <div className="lt-xs:h-4"></div>
      <div className="grid items-end pl-10  xs:pl-16 pt-3  ">
        <div className=" relative isolate">
          {/* blured image */}
          <Image
            src={imgs[0]}
            alt=""
            className="block min-w-0 rd-lt-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-15 -z-10"
            priority
          />
          <GradientMask
            direction="to right"
            transparencyStops={[
              [0, 100],
              // [60, 50],
              // [90, 20],
              [95, 0],
            ]}
          >
            <GradientMask
              direction="to bottom"
              transparencyStops={[
                [0, 100],
                [50, 40],
                [90, 0],
              ]}
            >
              <Image src={imgs[0]} alt="" className=" block min-w-0 rd-lt-3 shadow-xl object-cover" />
            </GradientMask>
          </GradientMask>
        </div>
      </div>
    </>
  );
}
