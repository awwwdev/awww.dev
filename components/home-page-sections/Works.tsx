import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import WorkItem from "./WorkItem";
import DarsoonImage from "@/public/works/darsoon.png";
import DarsoonImage2 from "@/public/works/darsoon-dashboard.png";
import JacksHouseImage from "@/public/works/jackshouse.png";
import DbiliaImage from "@/public/works/dbilia.png";
import DbiliaImage2 from "@/public/works/dbilia-2.png";
import DbiliaImage3 from "@/public/works/dbilia-3.png";
import DbiliaImage4 from "@/public/works/dbilia-4.png";
import NumbersForThingsImage from "@/public/works/numbers-for-things.png";
import MomentaImage from "@/public/works/momenta.png";
import DbiliaPremierImage from "@/public/works/dbilia-premier.png";
import GradientMask from "../ui/GradientMask";

export default function Works({ posts }) {
  return (
    <section className="relative">
      {/* <BluredCircle radius={200} top="50%" left="70%" bg="bg-cyan2A" blur="200px" /> */}
      {/* <BluredCircle radius={250} top="80%" left="20%" bg="bg-indigo1 " blur="200px" /> */}
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
            // imgSrcs={["/works/darsoon.png"]}
            imgs={[DarsoonImage]}
            categories={["UI Design", "Front End", "Back End"]}
            relatedBlogPost={posts.find((p) => p.id === "darsoon")}
            tools={["NextJS", "React", "TypeScript", "Server Components", "Tailwind CSS"]}
            gradient="from-[#82625B] to-[#351711]/0"
            // borderColor='b-orange4'
            description=""
          />
          <WorkItem
            title="Jack's House"
            subtitle="An Online Casino and E-Sports platform for Gamers Community"
            gridRow="xs:g-row-3/5"
            gridColumn="xs:g-col-1/2"
            imgSrcs={["/works/jackshouse.png"]}
            imgs={[JacksHouseImage]}
            tools={["NextJs", "React", "UnoCSS"]}
            gradient=" from-[#476687] via-[#476687]/30 "
            // borderColor='b-sky4'
          />
          <WorkItem
            title="Dbilia"
            subtitle="An NFT Marketplace withouth lock-ins"
            gridRow="xs:g-row-5/7"
            gridColumn="xs:g-col-1/2"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "dbilia")}
            tools={["NextJs", "React", "T3-Stack", "Prisma"]}
            // gradient="from-[#3E705E] via-[#0C140E]/10"
            gradient="from-[#0F6E52]  via-[#0F6E52]/30"
            imgSrcs={["/works/dbilia.png", "/works/dbilia-2.png", "/works/dbilia-3.png", "/works/dbilia-4.png"]}
            imgs={[DbiliaImage, DbiliaImage2, DbiliaImage3, DbiliaImage4]}
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
            imgs={[MomentaImage]}
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find((p) => p.id === "momenta")}
            tools={["NextJs", "React", "Framer Motion", ""]}
            gradient="from-[#462D45] to-[#372028]/0"
            // titleColor='c-pink12'
            // borderColor='b-pink4'
          />
          <WorkItem
            title="Numbers4Things"
            subtitle="An NFT Project, consisting numbers from 1 to 100,000,000."
            gridRow="xs:g-row-4/6"
            gridColumn="xs:g-col-2/3"
            imgSrcs={["/works/numbers-for-things.png"]}
            imgs={[NumbersForThingsImage]}
            tools={["NextJs", "React", "MetaMask"]}
            categories={["UI Design", "Front End", "Back End"]}
            gradient="from-[#695796] via-[#695796]/30"
            // titleColor='c-sand12'
            // borderColor='b-base4'
          />
          <WorkItem
            title="Dbilia Premier"
            subtitle="A platform to pre-order Music Videos with NFT, before they are released publicly"
            gridRow="xs:g-row-6/9"
            gridColumn="xs:g-col-2/3"
            imgSrcs={["/works/dbilia-premier.png"]}
            imgs={[DbiliaPremierImage]}
            tools={["NextJs", "React", "Prisma", "T3 Stack", "PostgreSQL"]}
            categories={["UI Design", "Front End"]}
            gradient="from-[#8F4F3B] via-[#8F4F3B]/30"
            // titleColor='c-tomato12'
            // borderColor='b-tomato4'
          />
          <li className=" rd-3  b-t-1.5 b-l-1 b-r-1 b-b-1  b-base4 b-t-base5 b-b-base8 b-r-base8 sahdow-xl  bg-clip-padding xs:g-row-7/9 xs:g-col-1/2 grid">
            <GradientMask
              style={{
                gridArea: "1/1/-1/-1",
              }}
              transparencyStops={[[0,0], [50 ,10], [100,100]]}
            >
              <div
                className="-z-10 w-full h-full rd-3 "
                style={{
                  backgroundImage: "url('/static/noise.svg')",
                  backgroundSize: "auto",
                  backgroundRepeat: "repeat",
                }}
              ></div>
            </GradientMask>
            <div
              className="rd-3 h-full flex flex-col bg-gradient-to-b from-gray2A to-gray1A"
              style={{
                gridArea: "1/1/-1/-1",
                // gridTemplateRows: "auto 1fr",
              }}
            >
              <a href="/#contact" className="block h-full p-3 xs:p-6">
                <div className="flex flex-col h-full">
                  <p className="fs-xl c-base11">Let&apos;s make antoher successfull story, together!</p>
                  <div className="mt-auto flex justify-end">
                    <div className="aspect-ratio-1/1 rd-full b-1 w-12 h-12 flex justify-center items-center b-base4 ">
                      <Icon name="bf-i-ph-arrow-right" className="c-base11" />
                    </div>
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
