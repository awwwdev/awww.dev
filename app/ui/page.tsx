import Space from "@/components/ui/Space";
import { useId } from "react";
import GradientMask, { gradientMask } from "@/components/ui/GradientMask";
import BluredCircle from "@/components/home-page-sections/BluredCircle";
import GlassCard from "@/components/ui/GlassCard";

// border color or gradient
// noise
// bg-gradient or color
//  shadow or glow

export default function Page() {
  return (
    <div className="max-w-page mx-auto ">
      <Section title="The Div">
        <div className="relative isolate">
          <BluredCircle radius={50} top="20%" left="85%" bg="bg-violet4" blur="0" />
          <BluredCircle radius={90} top="90%" left="5%" bg="bg-cyan4" blur="0" />
          {/* <div className="w-40 h-40 bg-blue4 absolute -top-5 -left-8"></div> */}
          <div className="z-100">
            <GlassCard
              className="rd-6  p-6 backdrop-blur-20px bg-gradient-to-br from-white/10 to-white/5"
              noiseLayerClassName=" "
              borderGradient="b-2 bg-gradient-to-br from-white/30  to-white/0"
            >
              <h2 className="H2">Title</h2>
              <div className="h"></div>
              <p className="c-base11">Subtitle</p>
              <p className="c-base11">description</p>
            </GlassCard>
          </div>
        </div>
      </Section>
      <Section title="Services">
        <div className=" b-1 bg-gradient-radial to-mauve2 via-mauve2 from-black  b-base3 rd-9 p-12 relative isolate  overflow-clip">
          <BluredCircle radius={200} top="20%" left="85%" bg="bg-violet2" blur="100px" />
          <BluredCircle radius={200} top="90%" left="5%" bg="bg-cyan2" blur="100px" />

          <p className="c-base11">awww.dev</p>
          <div className="h-6"></div>
          <h1 className="H1 leading-10">
            Website Design &
            <br />
            Development Services
          </h1>

          <div className="h-6"></div>
          <div
            className="grid gap-6 "
            style={{
              gridTemplateColumns: "3fr 2fr",
              // gridTemplateRows: 'repeat(9 , 1fr)'
            }}
          >
            <div className="grid gap-6">
              <ItemCard className="h-60 from-plum4A to-plum1A" gridColumn="1/2">
                <h2 className="H4">
                  Personal and
                  <br />
                  Portfolio Websites
                </h2>
                <div className="h-4"></div>
                {/* <p className="c-base11">For Perfessionals, Academic People, Artists and Photographers</p> */}
              </ItemCard>
              <ItemCard className="h-90 from-green4A to-green1A relative isolate  " gridColumn="1/2">
                <h2 className="H4">
                  Business Websites,
                  <br />
                  Online Shop and Web Apps
                </h2>
                <div className="h-4"></div>
                {/* <p className="c-base11">For startups, businesses and entrepreneurs</p> */}

                <div className=" absolute top-50%  left-50% -translate-x-50% -translate-y-50% w-full -z-1  ">
                  <GradientMask
                    direction="to right"
                    className=""
                    transparencyStops={[
                      [0, 5],
                      [30, 100],
                      [70, 100],
                      [100, 5],
                    ]}
                  >
                    <GradientMask
                      className=""
                      transparencyStops={[
                        [0, 5],
                        [40, 100],
                        [60, 100],
                        [100, 5],
                      ]}
                    >
                      <DotGrid rows={12} cols={12} />
                    </GradientMask>
                  </GradientMask>
                </div>
              </ItemCard>
            </div>
            <div className="grid gap-6">
              <ItemCard
                className="h-105 from-violet4A to-violet1 flex flex-col h-full relative isolate"
                // gridColumn="2/3"
              >
                <h2 className="H4">With Your Favorite techologies</h2>
                <div className="h-2"></div>
                <p className="c-base11"></p>
                <div className="mt-auto"></div>
                <Logos />
                <Circles />
              </ItemCard>
              <ItemCard className="h-45 from-slate4A to-slate1">
                <p className="flex flex-col h-full ">
                  <span className="c-base11">Visit work samples at:</span>
                  <span className="block mt-auto"></span>
                  <span className="font-mono tracking-wide fs-xl">https://awww.dev</span>
                </p>
              </ItemCard>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ItemCard({ gridRow, gridColumn, className = "", children }) {
  return (
    <div
      className={` ${className} z-10  bg-gradient-to-b rd-6 b-0 overflow-clip shadow-2xl   b-base5A flex flex-col p-6 relative isolate backdrop-blur-100px`}
      style={{ gridRow, gridColumn }}
    >
      <div></div>
      {children}
    </div>
  );
}

function Logos() {
  return (
    <div className="flex gap-1.5 flex-wrap pb-3 justify-end">
      <Logo src="/frameworks/react.svg" />
      <Logo src="/frameworks/webflow.svg" />
      <Logo src="/frameworks/wix.svg" />
      <Logo src="/frameworks/wordpress.svg" />
      <Logo src="/frameworks/shopify.svg" />
      <Logo src="/frameworks/squarespace.svg" />
      <Logo src="/frameworks/framer.svg" />
      <Logo src="/frameworks/weebly.svg" />
    </div>
  );
}

function Logo({ src }) {
  return (
    <div className="flex b-1 rd-2 b-base4 px-2 py-1 shrink-0 bg-gradient-to-r from-gray1A to-gray3A shadow-xl">
      <img src={src} alt="" className="shrink-0 h-6" />
    </div>
  );
}

function Section({ title, className = "", children }) {
  const headerId = useId();
  return (
    <section className={className} aria-labelledby={headerId}>
      <h1 className="H1" id={headerId}>
        {title}
      </h1>
      <Space size="h-8" />

      {children}

      <Space size="h-8" />
      <div className="b-t-2 b-base5"></div>
    </section>
  );
}

function DotGrid({ rows, cols }) {
  return (
    <div
      className=" grid  justify-items-center aspect-1/1"
      style={{
        gridTemplateColumns: `repeat(${cols} , 1fr)`,
        gridTemplateRows: `repeat(${rows} , 1fr)`,
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
    <div className="absolute grid items-center justify-items-center scale-90 opacity-50">
      <div className="" style={{ gridArea: "1/1/-1/-1" }}>
        <div
          className="b-1 b-white/15 bg-base2A rd-full w-120 h-120   md:w-120 md:h-120 md:-rotate-30 "
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
          className="b-1 b-white/15 bg-base3A rd-full w-90 h-90 md:-rotate-30"
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
          className="b-1 b-white/10 bg-base4A rd-full w-60 h-60 md:w-60 md:h-60 md:-rotate-30"
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
