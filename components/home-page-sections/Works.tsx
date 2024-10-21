import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import WorkItem from "./WorkItem";
import WORKS_DATA from "@/constants/WORKS_DATA";
import { CardContainer } from "./WorkItemCard";
import GradientBorderOverlay from "../ui/GradientBorderOverlay";
import { Post } from "@/lib/api";

export default function Works({ posts }: { posts: Post[] }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-page">
        <h2 className="H1" id="works">
          Works
        </h2>
        <Space size="h-8" />
        <ul className="grid gap-4 !lt-xs:grid-cols-1 " style={{ gridTemplateColumns: "3fr 2fr" }}>
          <WorkItem
            {...WORKS_DATA.darsoon}
            gridRow="xs:g-row-1/3"
            gridColumn="xs:g-col-1/2"
            categories={["UI Design", "Front End", "Back End"]}
            relatedBlogPost={posts.find((p) => p.id === "darsoon")}
            gradient="from-[#806761]/80 via-[#806761]/30 "
            borderGradeintFrom="from-[#806761]/90"
            linkToProject='https://darsoon.com/en'
          />
          <WorkItem
            {...WORKS_DATA.jacksHouse}
            gridRow="xs:g-row-3/5"
            gridColumn="xs:g-col-1/2"
            gradient=" from-[#476687] via-[#476687]/30 "
            borderGradeintFrom="from-[#476687]/90"
          />
          <WorkItem
            {...WORKS_DATA.dbilia}
            gridRow="xs:g-row-5/7"
            gridColumn="xs:g-col-1/2"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "dbilia")}
            gradient="from-[#0F6E52]  via-[#0F6E52]/30"
            borderGradeintFrom="from-[#0F6E52]/90"
            />
          <WorkItem
            {...WORKS_DATA.momenta}
            gridRow="xs:g-row-1/4"
            gridColumn="xs:g-col-2/3"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "momenta")}
            gradient="from-[#462D45] via-[#372028]/30"
            borderGradeintFrom="from-[#462D45]/90"
          />
          <WorkItem
            {...WORKS_DATA.numbersForThings}
            gridRow="xs:g-row-4/6"
            gridColumn="xs:g-col-2/3"
            categories={["UI Design", "Front End", "Back End"]}
            gradient="from-[#695796] via-[#695796]/30"
            borderGradeintFrom="from-[#695796]/90"
          />
          <WorkItem
            {...WORKS_DATA.dbiliaPremier}
            gridRow="xs:g-row-6/9"
            gridColumn="xs:g-col-2/3"
            categories={["UI Design", "Front End"]}
            gradient="from-[#8F4F3B] via-[#8F4F3B]/30"
            borderGradeintFrom="from-[#8F4F3B]/90"
          />
          <li className=" rd-3  sahdow-xl  bg-clip-padding xs:g-row-7/9 xs:g-col-1/2 grid">
            <a href="/#contact" className="block rd-3">
              <CardContainer
                gradient={""}
                borderGradeintFrom={"from-white/20 !via-slate3A  !to-white/20"}
                borderGradeintTo="to-white/8"
              >
                <div
                  className="block h-full  bg-gradient-to-b from-black/30 via-black/25 via-60% "
                  style={{ gridArea: "1/1/-1/-1" }}
                >
                  <div className="flex flex-col h-full">
                    <div className="px-5 pt-5 xs:px-6  xs:pt-5 ">
                      <p className="fs-xl c-base11">Let&apos;s make antoher successfull story, together!</p>
                    </div>
                    <div className="lt-xs:h-4"></div>
                    <div className="grid items-end pl-10  xs:pl-16 pt-3 ">
                      <div className=" relative isolate ">
                        {/* blured image */}
                        {/* <Image */}
                        <div className="w-full h-50 rd-tl-6 bg-gradient-to-br from-white/20 to-transparent blur-15 translate-y-5 " />
                        <div className="absolute mt-auto flex justify-end right-5 bottom-5 xs:right-6  xs:bottom-5 ">
                          <div className="aspect-ratio-1/1 rd-full  w-12 h-12 flex justify-center items-center  bg-gradient-to-br from-transparent via-transparent via-30%  hover:to-base3A relative">
                            <GradientBorderOverlay from="from-base6A" via="via-base3A" direction="135deg" />
                            <Icon name="bf-i-ph-arrow-right" className="c-base11 fs-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContainer>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Overlay({ expanded }) {
  return (
    <div className="relative">
      {!expanded && (
        <div className="bg-gradient-via-b from-transparent  via-base1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
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
