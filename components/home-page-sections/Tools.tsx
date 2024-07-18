import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import persianJs from "persianjs";
import LinkButton from "@/components/ui/button/LinkButton";
import { En, Fa } from "@/components/ui/multilang";
import FAQItem from "@/components/ui/FAQItem";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Emoji from "../Emoji";
import Space from "../ui/Space";
import Button from "../ui/button";
import ToolTip from "../ui/Tooltip";

export default function Tools() {
  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="15%" bg="bg-plum2" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="flex justify-between gap-8">
          <h2 className="H1">Tools</h2>
          <div className="flex items-center gap-3">
            <ToolTip
              trigger={
                <Button iconButton variation="ghost">
                  <Icon name="bf-i-ph-heart" />
                </Button>
              }
            >
              <p>Most loved</p>
            </ToolTip>
            <ToolTip
              trigger={
                <Button iconButton variation="ghost">
                  <Icon name="bf-i-ph-wrench" />
                </Button>
              }
            >
              Most Used
            </ToolTip>
            <ToolTip
              trigger={
                <Button iconButton variation="ghost">
                  <Icon name="bf-i-ph-syringe" />
                </Button>
              }
            >
              <p>Painful, But Life Saving</p>
            </ToolTip>
          </div>
        </div>
        <Space size="h-8" />

        <ul className="toolkit__grid">
          <Li
            className="aspect-ratio-1/1 bg-gradient-to-r from-gray-100 to-gray-200 c-white"
            gridPosition="g-col-1/4 g-row-1/4"
            src="/tool-logos/nextjs.svg"
            alt="NEXTjs"
            size="w-5/10"
          />
          <Li className="  bg-sky3 light " gridPosition="g-col-4/6 g-row-1/3" src="/tool-logos/react.svg" alt="React" />
          <Li
            className=" light bg-olive3"
            gridPosition="g-col-6/9 g-row-1/2"
            src="/tool-logos/supabase.svg"
            size="w-8/10"
            alt="Supabase"
          />

          {/* <Li
            className="  bg-violet4 light "
            src="/tool-logos/pwa.svg"
            alt="Progressive Web Applications"
          /> */}
          <Li
            className=" bg-gray5  "
            gridPosition="g-col-4/6 g-row-3/4"
            src="/tool-logos/radix-ui.svg"
            size=" filter-invert"
            alt="Radix-UI"
          />
          <Li
            className="bg-violet-100  "
            gridPosition="g-col-6/7 g-row-2/4"
            src="/tool-logos/astrojs.svg"
            alt="Astro"
            size=""
          />
          <Li
            className="  bg-teal3  aspect-ratio-1/1 "
            gridPosition="g-col-7/9 g-row-2/4"
            src="/tool-logos/nodejs.svg"
            alt="NodeJS"
          />

          <Li
            className=" dark bg-gray5"
            gridPosition="g-col-4/7 g-row-4/6"
            src="/tool-logos/figma.svg"
            alt="Figma"
            size=""
          />

          {/* <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" /> */}
          <Li
            className="col-span-2   bg-stone-100 "
            gridPosition="g-col-7/9 g-row-4/5"
            src="/tool-logos/unocss.svg"
            alt="UnoCSS"
          />

          <Li
            className="col-span-2   bg-gradient-to-r from-sky-100 to-teal-100"
            gridPosition="g-col-2/4 g-row-5/6"
            src="/tool-logos/tailwindcss.svg"
            alt="TailwindCSS"
            size="w-4/5"
          />
          <Li
            className="bg-gradient-to-r from-gray-300 to-slate-300 "
            gridPosition="g-col-1/3 g-row-4/5"
            src="/tool-logos/solidjs.svg"
            size="w-8/10"
            alt="Solidjs"
          />
          {/* <Li className="  bg-indigo6 dark" src="/tool-logos/zod.svg" size="w-9/10" alt="Zod validator" /> */}

          {/* <Li className="col-span-2  bg-red-50" src="/tool-logos/react-table.svg" alt="React Table" /> */}
          {/* <Li className=" bg-slate-100" src="/tool-logos/react-query-2.svg" alt="React-Query" /> */}
          {/* <Li className=" bg-pink4 light" src="/tool-logos/react-hook-form.svg" alt="React-Hook-Form" /> */}
          {/* <Li
              className=" bg-amber-100"
              icon="i-logos-adobe-illustrator"
              size="!w-1em !h-1em"
              alt="Adobe Illustrator"
            /> */}
          {/* <Li className=" bg-rose-50" icon="i-logos-adobe-indesign" size="!w-1em !h-1em" alt="Adobe InDesign" /> */}

          {/* <Li
            className=" bg-violet4 light"
            src="/tool-logos/strapi.svg"
            alt="Strapi"
            // size="w-4/5"
          /> */}

          <Li
            className="bg-purple4 light aspect-ratio-1/1"
            gridPosition="g-col-1/2 g-row-5/6"
            src="/tool-logos/vite.svg"
            alt="Vite"
          />
          {/* <Li className="bg-pink5 light" icon="i-logos-deno" size="!w-2em !h-2em" alt="Deno" /> */}
          {/* <Li className="bg-grass3 light" icon="i-logos-nodejs" size="!w-2em !h-2em" alt="nodejs" /> */}
          {/* <Li className="bg-gray-50" icon="i-logos-mongodb" size="!w-2em !h-2em" alt="MongoDB" /> */}

          {/* <Li className="bg-sky-50" icon="i-logos-postgresql" size="!w-2em !h-2em" alt="PostgreSQL" /> */}
          <Li
            className="bg-gradient-to-b from-blue-200 to-blue-50 aspect-ratio-1/1"
            gridPosition="g-col-8/9 g-row-5/6"
            src="/tool-logos/css.svg"
            alt="CSS"
          />
          <Li
            className=" bg-accent4 aspect-ratio-1/1"
            gridPosition="g-col-7/8 g-row-5/6"
            src="/tool-logos/html.svg"
            size="w-9/10"
            alt="HTML"
          />

          <Li
            className=" bg-blue-900 aspect-ratio-1/1"
            gridPosition="g-col-3/4 g-row-4/5"
            src="/tool-logos/typescript.svg"
            alt="TypeScript"
            size="w-9/10"
          />
          {/* <Li className="  bg-amber4 dark" 
          src="/tool-logos/javascript.svg" alt="JavaScript" size="w-9/10" /> */}
        </ul>
      </div>
    </section>
  );
}

function Li(props) {
  return (
    <li
      className={` p-4 rd-4 flex jc ac b-1.5 b-sand3A empty:b-transparent bg-origin-border ${props.className} ${props.gridPosition}`}
    >
      {props.icon && <Icon name={props.icon} className={`${props.size}`} />}
      {props.src && <img src={props.src} alt={props.alt} className={`object-cover `} />}
    </li>
  );
}
