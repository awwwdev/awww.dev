"use client";

import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import Button from "../ui/button";
import ToolTip from "../ui/Tooltip";
import { useState } from "react";

export default function Tools() {
  const [glowingCategory, setGlowingCategory] = useState<"favorite" | "most-used" | "painful" | null>(null);

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="15%" bg="bg-plum2" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="flex justify-between gap-8">
          <h2 className="H1" id="tools">
            Tools
          </h2>
          <div className="flex items-center gap-3">
            <ToolTip
              open={glowingCategory === 'favorite' }
              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === 'favorite' ?  "soft-accent" : "ghost" }

                  onClick={() => {
                    if (glowingCategory === "favorite") {
                      setGlowingCategory(null);
                    } else {
                      setGlowingCategory("favorite");
                    }
                  }}
                >
                  <Icon name="bf-i-ph-heart" />
                </Button>
              }
            >
              <p>Most loved</p>
            </ToolTip>
            <ToolTip
              open={glowingCategory === 'most-used' }

              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === 'most-used' ?  "soft-accent" : "ghost" }

                  onClick={() => {
                    if (glowingCategory === "most-used") {
                      setGlowingCategory(null);
                    } else {
                      setGlowingCategory("most-used");
                    }
                  }}
                >
                  <Icon name="bf-i-ph-wrench" />
                </Button>
              }
            >
              Most Used
            </ToolTip>
            <ToolTip
              open={glowingCategory === 'painful' }

              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === 'painful' ?  "soft-accent" : "ghost" }
                  onClick={() => {
                    if (glowingCategory === "painful") {
                      setGlowingCategory(null);
                    } else {
                      setGlowingCategory("painful");
                    }
                  }}
                >
                  <Icon name="bf-i-ph-syringe" />
                </Button>
              }
            >
              <p>Painful, But Life Saving</p>
            </ToolTip>
          </div>
        </div>
        <Space size="h-4" />

        <ul className="toolkit__grid">
          <Li
            className="aspect-ratio-1/1 bg-gradient-to-br from-gray2A to-gray1 c-white"
            gridPosition="g-col-1/4 g-row-1/4"
            src="/tool-logos/nextjs.svg"
            alt="NEXTjs"
            size="w-5/10"
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className="  bg-sky3 light "
            gridPosition="g-col-4/6 g-row-1/3"
            src="/tool-logos/react.svg"
            alt="React"
            size='w-7/10'
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className=" light bg-sage2"
            gridPosition="g-col-6/9 g-row-1/2"
            src="/tool-logos/supabase.svg"
            size="w-7/10"
            alt="Supabase"
            isGlowing={glowingCategory === "favorite"}
          />

          {/* <Li
            className="  bg-violet4 light "
            src="/tool-logos/pwa.svg"
            alt="Progressive Web Applications"
          /> */}
          <Li
            className=" bg-gray1  "
            gridPosition="g-col-4/6 g-row-3/4"
            src="/tool-logos/radix-ui.svg"
            size="w-6/10 filter-invert"
            alt="Radix-UI"
          />
          <Li
            className="bg-orange2 "
            gridPosition="g-col-6/7 g-row-2/4"
            src="/tool-logos/astrojs.svg"
            alt="Astro"
            size="w-8/10"
          />
          <Li
            className="  bg-jade1 "
            gridPosition="g-col-7/9 g-row-2/4 "
            src="/tool-logos/nodejs.svg"
            alt="NodeJS"
            size='w-8/10'
            isGlowing={glowingCategory === "most-used"}
          />

          <Li
            className=" dark bg-sand2"
            gridPosition="g-col-4/7 g-row-4/6"
            src="/tool-logos/figma.svg"
            alt="Figma"
            size=""
          />

          {/* <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" /> */}
          <Li
            className="col-span-2  "
            gridPosition="g-col-7/9 g-row-4/5"
            src="/tool-logos/unocss.svg"
            alt="UnoCSS"
          />

          <Li
            className="col-span-2   bg-cyan3"
            gridPosition="g-col-2/4 g-row-5/6"
            src="/tool-logos/tailwindcss.svg"
            alt="TailwindCSS"
            size="w-4/5"
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className="bg-blue3 "
            gridPosition="g-col-1/3 g-row-4/5"
            src="/tool-logos/solidjs.svg"
            size="w-8/10"
            alt="Solidjs"
            isGlowing={glowingCategory === "favorite"}
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
            className="bg-gradient-to-b from-indigo7 to-indigo9 aspect-ratio-1/1"
            gridPosition="g-col-8/9 g-row-5/6"
            src="/tool-logos/css.svg"
            alt="CSS"
            isGlowing={glowingCategory === "favorite"}
          />
          <Li
            className=" bg-accent4 aspect-ratio-1/1"
            gridPosition="g-col-7/8 g-row-5/6"
            src="/tool-logos/html.svg"
            size="w-9/10"
            alt="HTML"
          />

          <Li
            className=" bg-blue9 aspect-ratio-1/1"
            gridPosition="g-col-3/4 g-row-4/5"
            src="/tool-logos/typescript.svg"
            alt="TypeScript"
            size="w-9/10"
            isGlowing={glowingCategory === "painful"}
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
      className={` p-4 rd-4 flex jc ac b-1.5 b-sand3A empty:b-transparent bg-origin-border ${props.className} ${
        props.gridPosition
      } ${props.isGlowing && "???"}`}
    >
      {props.icon && <Icon name={props.icon} className={`${props.size}`} />}
      {props.src && <img src={props.src} alt={props.alt} className={`object-cover ${props?.size}`} />}
    </li>
  );
}
