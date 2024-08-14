import Image from 'next/image';

export default function WorkItemCard({ title, imgs, imgSrcs, subtitle, gradient, titleColor, borderColor }) {
  return (
    <div
      className={`h-full rd-3 bg-base1A grid overflow-clip b-t-1.5 b-l-1 b-r-1 b-b-0.5 b-t-base5 sahdow-2xl bg-clip-padding ${
        borderColor ?? "b-base4"
      } `}
      style={{
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backdropFilter: "blur(10px)",
        // borderRadius: 'calc(0.02 * var(--max-w-page))'
      }}
    >
      <div
        className={`${gradient} bg-gradient-to-b  h-full grid`}
        style={{
          gridTemplateRows: "auto 1fr",
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

            <Image src={imgs[0]} alt="" className="block min-w-0 rd-lt-3 shadow-xl object-cover fade-to-b" />
          </div>
        </div>
      </div>
    </div>
  );
}






