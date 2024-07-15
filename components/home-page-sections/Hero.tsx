import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import LinkButton from "@/components/ui/button/LinkButton";
import { En, Fa } from "@/components/ui/multilang";
import StarRating from "@/components/ui/StarRating";
import BluredCircle from "./BluredCircle";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";
import Space from "../ui/Space";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import { InputDebaounced } from "../Table/Filter";
import { useState } from "react";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <div>
      <MobileOnly>
        <MobileHero />
      </MobileOnly>
      <DesktopOnly>
        <DesktopHero />
      </DesktopOnly>
    </div>
  );
}

function DesktopHero() {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const banner = supabase.storage.from("base").getPublicUrl(`banner.webp`);
  const { locale } = useRouter();

  return (
    <section className="relative ">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue2" blur="200px" />

      <div className="flex flex-row gap-8 items-center justify-center  w-full max-w-page mx-auto  ">
        <DesktopHeroImage />
        <div className="flex flex-col justify-center ">
          <p className="font-display fs-4xl fw-600 line-height-0.8">
            Hello! <br /> Im' Hamid.
          </p>
        </div>
      </div>
      <div className='max-w-page mx-auto'>
        <GridSection />
      </div>
    </section>
  );
}


function GridSection(){

return (
  <div >
    <p className='font-display'> I design and develope websites</p>
  </div>
)};

function MobileHero() {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <section className="relative ">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue2" blur="200px" />

      <div className="flex flex-col  gap-8 items-center w-full max-w-page mx-auto  ">
        <div className="flex flex-col justify-center ">
          <h1 className="H2 text-accent10 fw-800 text-center line-height-0.75 ">
            <En>
              Learn with
              <br />
              Top-Notch Tutors Online
            </En>
            <Fa>با بهترین مدرسان آنلاین یاد بگیرید</Fa>
          </h1>
          <Space size="h-2" />
          <Fa></Fa>
          <En>
            <p className="c-sand11 leading-5 text-center">
              Empower Your Family&apos;s Learning.
              <br />
              Explore Subjects with Professional Online Tutors.
            </p>
          </En>
          <div className="h-4"></div>
          <MobileHeroImage />
          <div className="-mt-20">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHeroImage() {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <div className="relative  flex justify-center items-center   ">
      <Image
        src="/profile-picture.png"
        width={200}
        height={200}
        className={`w-60 w-60  scale-110 ${locale === "fa" && "scale-x--100"} `}
        alt=""
        priority
      ></Image>
    </div>
  );
}

function DesktopHeroImage() {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <div className={` flex  items-center  `}>
      <div className="relative  flex justify-center items-center   ">
        {/* <Circle /> */}
        <Image
          src="/profile-picture.png"
          width={200}
          height={200}
          className={`object-cover w-50 h-50 rd-full bg-sand3 `}
          alt=""
          priority
        ></Image>
      </div>
    </div>
  );
}
function FeatureCard({ color, title, icon, className = "" }) {
  const { t } = useTranslation();

  return (
    <li
      className={`  shd-tinted-3  p-2 rd-3 text-xs line-height-0.8 flex   md:flex-row gap-3 items-center  ${className} bg-white/80 glass-effect`}
    >
      <FeatureIcon color={color} icon={icon} />
      <div className="flex-1 c-melow flex items-center">
        <p className="font-bold  ">{title}</p>
        {/* <p>{description}</p> */}
      </div>
    </li>
  );
}

function FeatureIcon({ color, icon }) {
  return (
    <div className={`w-7 md:w-10 h-7 md:h-10 rd-full ${color} flex justify-center items-center shd-tinted-3`}>
      {/* <Icon name="bf-i-ph-list" /> */}
      <Icon name={icon} className="text-lg c-brand-dark-blue" subdued={false} />
    </div>
  );
}

{
  /* <Image
src={banner.data.publicUrl}
alt="banner"
width={1280}
height={622}
className="sm:display-none   rounded-xl  shd-tinted-4 "
/> */
}

function Circle() {
  return (
    <div className="  rd-full h-full w-full px-5 sm:px-20 md:px-20 absolute">
      <div className="bg-orange4A w-full h-full rd-full"></div>
    </div>
  );
}
