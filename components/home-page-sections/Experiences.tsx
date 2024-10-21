import BluredCircle from "./BluredCircle";
import Space from "../ui/Space";
import ShowMore from "../ShowMore";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";
import GradientMask from "../ui/GradientMask";
import EXPERIENCES_DATA from "@/constants/EXPERIENCES_DATA";

export default function Experiences() {
  return (
    <section className="relative">
      <BluredCircle radius={200} top="20%" left="95%" bg="bg-gold2" blur="200px" />
      <BluredCircle radius={250} top="10rem" left="20%" bg="bg-sky1 opacity-50" blur="200px" />

      <div className="mx-auto max-w-page">
        <h2 className="H1" id="works">
          Experiences
        </h2>
        <Space size="h-8" />
        <ul role="list" className="list-none list-disc-outside pt-4 b-l-2 b-transparent   relative">
          <GradientMask
            className="absolute -top-5% -bottom-5% -left-2px -z-1"
            direction="to bottom"
            transparencyStops={[
              [0, 0],
              [10, 100],
              [90, 100],
              [100, 0],
            ]}
          >
            <div className="w-2px b-base5A b-dashed b-l-2 h-full"></div>
          </GradientMask>
          <WorkExperience {...EXPERIENCES_DATA.darsoon}></WorkExperience>
          <WorkExperience {...EXPERIENCES_DATA.jacksHouse}></WorkExperience>
          <WorkExperience {...EXPERIENCES_DATA.momenta}></WorkExperience>
          <WorkExperience {...EXPERIENCES_DATA.webFreelancer}></WorkExperience>
          <WorkExperience {...EXPERIENCES_DATA.designerFreelancer}></WorkExperience>
          </ul>
      </div>
    </section>
  );
}

function WorkExperience({ title, start, end, startMobile, endMobile, company, whatIDid }) {
  return (
    <li className="-ml-1.75  flex gap-2">
      <div className="w-3 h-3 bg-[#5a6169] rd-1 shrink-0 grow-0"></div>
      <div className="pis-2">
        <h3 className="">
          <div className="H5 line-height-0.8 tracking-wide">{company}</div>
          <Space size="h-1" />
          <div className="flex flex-wrap items-baseline  tracking-wide">
            <div className="font-content  c-base11 whitespace-nowrap mie-2">{title}</div>
            <DesktopOnly>
              <div className="c-base11 fs-sm ">
                {start} - {end}
              </div>
            </DesktopOnly>
            <MobileOnly>
              <div className="c-base11 fs-sm ">
                {startMobile} - {endMobile}
              </div>
            </MobileOnly>
          </div>
        </h3>

        <Space size="h-6" />
        <ShowMore minHeight="3em">
          <ul
            className={`list-disc-outside  fs-sm space-y-1.2em `}
            style={{
              listStyleImage: 'url("circle-list-item-marker.svg")',
            }}
          >
            {whatIDid &&
              whatIDid.length > 0 &&
              whatIDid.map((item, index: number) => {
                return <Li key={`what-i-did-${title}-${index}`}>{item}</Li>;
              })}
          </ul>
        </ShowMore>

        <Space size="xs:h-2 h-8" />
      </div>
    </li>
  );
}

function Overlay({ expanded }) {
  return (
    <div className="relative">
      {!expanded && (
        <div className="bg-gradient-to-b from-transparent  to-base1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
      )}
    </div>
  );
}

function Li({ className = "", children }) {
  return (
    <li className={`${className} flex gap-1.5 items-baseline`}>
      <div className="pb-0.125em ">
        <div className="w-1.5 h-1.5 rd-full  bg-base6 shrink-0 " />
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}
