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

export default function Tools() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <h2 className="H1">Toolkit</h2> 
        <div className=" toolkit__grid">
          {/* <h3 className="H3">For Development</h3> */}
          <ul className="display-contents">
            <Li
              className="col-span-3 row-span-3 bg-gradient-to-r from-gray-100 to-gray-200"
              src="/tool-logos/nextjs.svg"
              alt="NEXTjs"
              size="w-5/10"
            />
            <Li className="sm:col-span-2  bg-sky3 light " src="/tool-logos/react.svg" alt="React" />
            <Li
              className="col-span-3 row-span-2 light bg-olive3"
              src="/tool-logos/supabase.svg"
              size="w-8/10"
              alt="Supabase"
            />

            <Li className="  bg-blue-900" src="/tool-logos/typescript.svg" alt="TypeScript" size="w-9/10" />
            <Li className="  bg-amber4 dark" src="/tool-logos/javascript.svg" alt="JavaScript" size="w-9/10" />
            {/* <Li
            className="  bg-violet4 light "
            src="/tool-logos/pwa.svg"
            alt="Progressive Web Applications"
          /> */}
            <Li className=" bg-orange4" src="/tool-logos/html.svg" size="w-9/10" alt="HTML" />
            <Li
              className="col-span-2  bg-gray5 dark "
              src="/tool-logos/radix-ui.svg"
              size="w-8/10 filter-invert"
              alt="Radix-UI"
            />

            <Li
              className="col-span-3 row-span-2  sm:row-span-3 dark bg-gray5"
              src="/tool-logos/figma.svg"
              alt="Figma"
              size=""
            />

            <Li className="  bg-gradient-to-b from-blue-200 to-blue-50" src="/tool-logos/css.svg" alt="CSS" />
            <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" />
            <Li className="col-span-2   bg-stone-100 " src="/tool-logos/unocss.svg" alt="UnoCSS" size="w-9/10" />
            <Li
              className="bg-violet-100 col-span-2 sm:col-span-1 sm:row-span-2 row-span-3"
              src="/tool-logos/astrojs.svg"
              alt="Astro"
              size="w-5/10"
            />
            <Li
              className="col-span-2   bg-gradient-to-r from-sky-100 to-teal-100"
              src="/tool-logos/tailwindcss.svg"
              alt="TailwindCSS"
              size="w-4/5"
            />
            <Li
              className="col-span-2 sm:row-span-2 bg-gradient-to-r from-gray-300 to-slate-300"
              src="/tool-logos/solidjs.svg"
              size="w-8/10"
              alt="Solidjs"
            />
            <Li className="  bg-indigo6 dark" src="/tool-logos/zod.svg" size="w-9/10" alt="Zod validator" />

            {/* <Li className="col-span-2  bg-red-50" src="/tool-logos/react-table.svg" alt="React Table" /> */}
            <Li className=" bg-slate-100" src="/tool-logos/react-query-2.svg" alt="React-Query" />
            <Li className=" bg-pink4 light" src="/tool-logos/react-hook-form.svg" alt="React-Hook-Form" />
          </ul>
          {/* <h3>My Future Stack</h3> */}
          <ul className="display-contents">
            <Li
              className=" bg-amber-100"
              icon="i-logos-adobe-illustrator"
              size="!w-1em !h-1em"
              alt="Adobe Illustrator"
            />
            <Li className=" bg-rose-50" icon="i-logos-adobe-indesign" size="!w-1em !h-1em" alt="Adobe InDesign" />

            {/* <Li
            className=" bg-violet4 light"
            src="/tool-logos/strapi.svg"
            alt="Strapi"
            // size="w-4/5"
          /> */}

            <Li className="  bg-purple4 light" src="/tool-logos/vite.svg" alt="Vite" />
            <Li className="bg-pink5 light" icon="i-logos-deno" size="!w-2em !h-2em" alt="Deno" />
            {/* <Li className="bg-grass3 light" icon="i-logos-nodejs" size="!w-2em !h-2em" alt="nodejs" /> */}
            {/* <Li className="bg-gray-50" icon="i-logos-mongodb" size="!w-2em !h-2em" alt="MongoDB" /> */}
            {/* <Li className="bg-sky-50" icon="i-logos-postgresql" size="!w-2em !h-2em" alt="PostgreSQL" /> */}
          </ul>
          {/* <h3>Honorable Mentions!</h3> */}
          <ul className="display-contents"></ul>
          {/* <h3 className="H3">Design Tools</h3> */}
          <ul className="display-contents">
            {/* <Li className="col-span-3 row-span-2 dark bg-gray4" src="/tool-logos/figma.svg" alt="Figma" size="" /> */}
            {/* <Li className="bg-pink-100" icon="i-logos-dribbble-icon" size="!w-2em !h-2em" alt="Dribbble" /> */}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Li(props) {
  return (
    <li
      className={`toolkit__grid-item p-4 rd-4 flex jc ac b-1.5 b-sand3A empty:b-transparent bg-origin-border ${props.className}`}
    >
      {props.icon && <Icon name={props.icon} alt={props.alt} className={`${props.size}`} />}
      {props.src && <img src={props.src} alt={props.alt} className={`object-cover  ${props.size}`} />}
    </li>
  );
}
