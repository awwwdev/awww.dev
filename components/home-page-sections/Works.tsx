import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import { useState } from "react";
import Button from "../ui/button";
import ShowMore from "../ShowMore";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";
import WorkItem from "./WorkItem";

export default function Works({posts}) {
  return (
    <section className="relative">
      <BluredCircle radius={200} top="20%" left="95%" bg="bg-gold2" blur="200px" />
      <BluredCircle radius={250} top="30rem" left="20%" bg="bg-sky1 opacity-50" blur="200px" />
      <div className="mx-auto max-w-page">
        <h2 className="H1" id="works">
          Work
        </h2>
        <Space size="h-8" />
        <ul className="grid gap-2 xs:gap-4 !lt-xs:grid-cols-1 " style={{ gridTemplateColumns: "3fr 2fr" }}>
          <WorkItem
            title="Darsoon"
            subtitle="A platform for finding online tutors"
            gridRow="1/3"
            gridColumn="1/2"
            imgSrc="/works/darsoon.png"
            categories={["UI Design", "Front End", "Back End"]}
            relatedBlogPost={posts.find(p => p.id === 'darsoon')}
          />
          <WorkItem
            title="Jack's House"
            subtitle="An Online Casino for Gamers Community"
            gridRow="3/5"
            gridColumn="1/2"
            imgSrc="/works/jackshouse.png"
            categories={["UI Design", "Front End"]}
          />
          <WorkItem
            title="Dbilia"
            subtitle="An NFT Marketplace"
            gridRow="5/7"
            gridColumn="1/2"
            imgSrc="/works/dbilia.png"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find(p => p.id === 'dbilia')}

          />
          {/* <WorkItem title="Let's make antoher successfull story" gridRow="7/9" gridColumn="1/2" imgSrc="" /> */}

          <WorkItem
            title="Momenta"
            subtitle="Business Website for Momenta Web3 Agency"
            gridRow="1/4"
            gridColumn="2/3"
            imgSrc="/works/momenta.png"
            categories={["UI Design", "Front End"]}
            relatedBlogPost={posts.find(p => p.id === 'momenta')}
          />
          <WorkItem
            title="Numbers4Things"
            subtitle="An NFT Project"
            gridRow="4/6"
            gridColumn="2/3"
            imgSrc="/works/numbers-for-things.png"
            categories={["UI Design", "Front End", "Back End"]}
          />
          <WorkItem
            title="Dbilia Premier"
            subtitle="A platform selling Music Videos with NFT"
            gridRow="6/9"
            gridColumn="2/3"
            imgSrc="/works/dbilia-premier.png"
            categories={["UI Design", "Front End"]}
          />
          <li className=" rd-3 b-t-1 b-l-1 b-r-1 b-base4 sahdow-xl bg-clip-padding"
                style={{
                  gridTemplateRows: "auto 1fr",
                  backgroundImage: "url('/static/noise.svg')",
                  backgroundSize: "auto",
                  backgroundRepeat: "repeat",
                  backdropFilter: "blur(10px)",
                  gridRow:"7/9",
                   gridColumn:"1/2"
                }}
          
          >
              <a  href='/#contact' className='block h-full p-3 xs:p-6'>
            <div className="flex flex-col h-full">
            <p>
            Let's make antoher successfull story
            </p>
            <div className='mt-auto flex justify-end'>
            <Icon name='bf-i-ph-arrow-right' />
            </div>
            </div>
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
        <div className="bg-gradient-to-b from-transparent  to-sand1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
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
