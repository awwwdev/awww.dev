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
import Toggle from "../ui/Toggle";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from '../ui/button';

export default function Hero() {
  return (
    <div>
      <DesktopHero />
    </div>
  );
}

function DesktopHero() {
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
      <div className="max-w-page mx-auto">
        <GridSection />
      </div>
    </section>
  );
}

function GridSection() {
  return (
    <div className="grid gap-3">
      <p className="font-display"> I design and develope websites</p>
      {/* <Plate>
  <Toggle />
</Plate> */}
      <Plate>
        <Input placeholder="Search..." suffix="X" />
      </Plate>
      <Plate>
        <Checkbox label="Checkbox" />
      </Plate>

      <Plate>
        <div className="flex gap-3">
          <FontSample size="xs" className="fs-xs" />
          <FontSample size="sm" className="fs-sm" />
          <FontSample size="md" className="fs-md" />
          <FontSample size="lg" className="fs-lg" />
          <FontSample size="xl" className="fs-xl" />
          <FontSample size="2xl" className="fs-2xl" />
        </div>
  </Plate>
  <Plate>
    <Button variation='ghost'
      prefix={<Icon name='bf-i-ph-bookmark' />}
    >
      Button
    </Button>
  </Plate>
  <CodePlate />
  <MusicPlayerPlate />
  <ColorPalettePlate />
    </div>
  );
}

function ColorPalettePlate(){

return (
  <div >

  </div>
)};

function MusicPlayerPlate(){

  return (
    <Plate>
    <div>
      <div className='flex gap-2'>
        <Button variation='text' >
          <Icon name='bf-i-ph-skip-back' />

        </Button>
        <Button variation='text' iconButton >
          <Icon name='bf-i-ph-play' />
        </Button>
        <Button variation='text' iconButton>
          <Icon name='bf-i-ph-skip-forward' />
        </Button>

      </div>
      <div>
        {/* <Slider /> */}
      </div>
    </div>
  </Plate>
  
  )};
  

function CodePlate(){

return (
  <Plate>
  <div className=''>
    <div className='bg-base5 -mx-4 -mt-4 rd-t-4 mb-4  h-8'></div>
      <code>
    <pre>
      &lt;div&gt;
      <br />
        ...
      <br />
      &lt;/div&gt;
      
    </pre>
      </code>
  </div>
</Plate>

)};

function FontSample({ className, size }) {
  return (
    <div className="">
      <div className="flex flex-col gap-1 items-center">
        <div className={`font-display ${className} h-10 flex items-end`}>Aa</div>
        <div className='text-xs c-base11'>{size}</div>
      </div>
    </div>
  );
}

function Plate({ children }) {
  return <div className="p-4 rd-4 shadow-lg bg-sand3 w-fit">{children}</div>;
}

function DesktopHeroImage() {
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
