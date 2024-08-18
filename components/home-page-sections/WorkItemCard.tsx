import Image from "next/image";
import GradientMask from "../ui/GradientMask";

export default function WorkItemCard({ title, imgs, imgSrcs, subtitle, gradient, titleColor, borderColor }) {
  return (
    <div className="grid h-full">
      <div
        style={{ gridArea: "1/1/-1/-1" }}
        className={`p-8 -z-100`}
      >
        <div
        
        className={`h-full w-full bg-gradient-to-b rd-3 ${gradient} mix-blend-screen blur-60 opacity-100 -z-100`}
        ></div>
      </div>
      <div style={{ gridArea: "1/1/-1/-1" }} className={`bg-sand1 -z-80 rd-3`}></div>

      <div
        className={`h-full rd-3 bg-base1A grid overflow-clip b-t-1.5 b-l-1 b-r-1 b-b-1 b-t-base5 b-b-slate7A b-r-slate7A sahdow-2xl bg-clip-padding grid ${
          borderColor ?? "b-base4"
        } `}
        style={{
          gridArea: "1/1/-1/-1",
          // borderRadius: 'calc(0.02 * var(--max-w-page))'
        }}
      >
        <div
          className="-z-10"
          style={{
            gridArea: "1/1/-1/-1",
            backgroundImage: "url('/static/noise.svg')",
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
            backdropFilter: "blur(10px)",
          }}
        ></div>
        <div
          className={`${gradient} bg-gradient-to-b  h-full grid`}
          style={{
            gridTemplateRows: "auto 1fr",
            gridArea: "1/1/-1/-1",
          }}
        >
          <div className="px-3 xs:px-6 pt-3 xs:pt-5 ">
            <h3 className={`H4 sm:H3 ${titleColor}`}>{title}</h3>
            <p className="c-base11 text-sm">{subtitle}</p>
          </div>
          <div className="grid items-end pl-6  xs:pl-16 pt-3  ">
            <div className=" relative isolate">
              <Image
                src={imgs[0]}
                alt=""
                className="block min-w-0 rd-lt-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
              />
              <GradientMask
                direction="to right"
                transparencyStops={[
                  [0, 100],
                  [70, 50],
                  [87, 20],
                  [95, 5],
                ]}
                // disable
              >
                <Image src={imgs[0]} alt="" className="block min-w-0 rd-lt-3 shadow-xl object-cover fade-to-b" />
              </GradientMask>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
