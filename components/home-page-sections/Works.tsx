import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import WorkItem from "./WorkItem";

export default function Works({ posts }) {
  return (
    <section className="relative">
      <BluredCircle radius={200} top="20%" left="95%" bg="bg-gold2" blur="200px" />
      <BluredCircle radius={250} top="30rem" left="20%" bg="bg-sky1 opacity-50" blur="200px" />
      <div className="mx-auto max-w-page">
        <h2 className="H1" id="works">
          Works
        </h2>
        <Space size="h-8" />
        <ul className="grid gap-4 !lt-xs:grid-cols-1 " style={{ gridTemplateColumns: "3fr 2fr" }}>
          <WorkItem
            title="Darsoon"
            subtitle="A platform for finding online tutors"
            gridRow="xs:g-row-1/3"
            gridColumn="xs:g-col-1/2"
            imgSrcs={["/works/darsoon.png"]}
            categories={["UI Design", "Front End", "Back End"]}
            relatedBlogPost={posts.find((p) => p.id === "darsoon")}
            tools={["NextJS", "React", "TypeScript", "Server Components", "Tailwind CSS"]}
            gradient="from-[#82625B] to-orange1A"
            // borderColor='b-orange4'
          />
          <WorkItem
            title="Jack's House"
            subtitle="An Online Casino for Gamers Community"
            gridRow="xs:g-row-3/5"
            gridColumn="xs:g-col-1/2"
            imgSrcs={["/works/jackshouse.png"]}
            tools={["NextJs", "React", "UnoCSS"]}
            gradient=" from-[#303A47] via-sky1A"
            // borderColor='b-sky4'
          />
          <WorkItem
            title="Dbilia"
            subtitle="An NFT Marketplace"
            gridRow="xs:g-row-5/7"
            gridColumn="xs:g-col-1/2"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "dbilia")}
            tools={["NextJs", "React", "T3-Stack", "Prisma"]}
            gradient="from-[#3E705E] via-[#0C140E]/10"
            imgSrcs={["/works/dbilia.png" ,"/works/dbilia-2.png", "/works/dbilia-3.png", "/works/dbilia-4.png"]}
            // titleColor='c-pink12'
            // borderColor='b-violet4'
          />
          {/* <WorkItem title="Let's make antoher successfull story" gridRow="xs:g-row-7/9" gridColumn="xs:g-col-1/2" imgSrc="" /> */}

          <WorkItem
            title="Momenta"
            subtitle="Business Website for Momenta Web3 Agency"
            gridRow="xs:g-row-1/4"
            gridColumn="xs:g-col-2/3"
            imgSrcs={["/works/momenta.png"]}
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "momenta")}
            tools={["NextJs", "React", "Framer Motion", ""]}
            gradient="from-[#462D45] via-pink1A"
            // titleColor='c-pink12'
            // borderColor='b-pink4'
          />
          <WorkItem
            title="Numbers4Things"
            subtitle="An NFT Project"
            gridRow="xs:g-row-4/6"
            gridColumn="xs:g-col-2/3"
            imgSrcs={["/works/numbers-for-things.png"]}
            tools={["NextJs", "React", "MetaMask"]}
            categories={["UI Design", "Front End", "Back End"]}
            gradient="from-[#151515] via-base3"
            // titleColor='c-sand12'
            // borderColor='b-base4'
          />
          <WorkItem
            title="Dbilia Premier"
            subtitle="A platform selling Music Videos with NFT"
            gridRow="xs:g-row-6/9"
            gridColumn="xs:g-col-2/3"
            imgSrcs={["/works/dbilia-premier.png"]}
            tools={["NextJs", "React", "Prisma", "T3 Stack", "PostgreSQL"]}
            categories={["UI Design", "Front End"]}
            gradient="from-[#934D37] via-[#934D37]/20"
            // titleColor='c-tomato12'
            // borderColor='b-tomato4'
          />
          <li
            className=" rd-3  b-t-1 b-l-1 b-r-1 b-base4 sahdow-xl  bg-clip-padding xs:g-row-7/9 xs:g-col-1/2"
            style={{
              backgroundImage: "url('/static/noise.svg')",
              backgroundSize: "auto",
              backgroundRepeat: "repeat",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="rd-3 h-full flex flex-col bg-gradient-to-b from-gray6A"
              style={{
                // gridTemplateRows: "auto 1fr",
              }}
            >
              <a href="/#contact" className="block h-full p-3 xs:p-6">
                <div className="flex flex-col h-full">
                  <p className='fs-xl fw-500'>Let&apos;s make antoher successfull story</p>
                  <div className="mt-auto flex justify-end">
                    <Icon name="bf-i-ph-arrow-right" />
                  </div>
                </div>
              </a>
            </div>
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
        <div className="bg-gradient-via-b from-transparent  via-sand1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
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
