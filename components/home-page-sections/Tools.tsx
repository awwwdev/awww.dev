"use client";

import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import Button from "../ui/button";
import ToolTip from "../ui/Tooltip";
import { useState } from "react";

export default function Tools() {
  const [glowingCategory, setGlowingCategory] = useState<"favorite" | "most-used" | "painful" | null>(null);
  const [isToolitip1Open, setIsTooltip1Open] = useState<boolean>(false);
  const [isToolitip2Open, setIsTooltip2Open] = useState<boolean>(false);
  const [isToolitip3Open, setIsTooltip3Open] = useState<boolean>(false);

  return (
    <section className="relative">
      <BluredCircle radius={200} top="100%" left="60%" bg="bg-bronze2A" blur="200px" />
      <BluredCircle radius={200} top="50%" left="70%" bg="bg-sage2A " blur="200px" />
      <BluredCircle radius={200} top="50%" left="20%" bg="bg-violet2A opacity-70" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="flex justify-between gap-8">
          <h2 className="H1" id="tools">
            Tools
          </h2>
          <div className="flex items-center gap-3">
            <ToolTip
              open={glowingCategory === "favorite" || isToolitip1Open}
              setOpen={setIsTooltip1Open}
              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === "favorite" ? "soft-accent" : "ghost"}
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
              open={glowingCategory === "most-used" || isToolitip2Open}
              setOpen={setIsTooltip2Open}
              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === "most-used" ? "soft-accent" : "ghost"}
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
              open={glowingCategory === "painful" || isToolitip3Open}
              setOpen={setIsTooltip3Open}
              trigger={
                <Button
                  iconButton
                  variation={glowingCategory === "painful" ? "soft-accent" : "ghost"}
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
            className=" bg-gradient-to-br from-gray3A  via-gray1A to-transparent c-white"
            gridPosition="g-col-1/4 g-row-1/3 xxs:g-col-1/4 xxs:g-row-1/4"
            src="/tool-logos/nextjs.svg"
            alt="NEXTjs"
            size="w-5/10"
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className=" bg-gradient-to-b from-sky1 to-sky3 "
            gridPosition="g-col-3/5 g-row-3/5  xxs:g-col-4/6 xxs:g-row-1/3"
            src="/tool-logos/react.svg"
            alt="React"
            size="w-7/10"
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className="  bg-gradient-to-b from-sage1 to-sage3"
            gridPosition="g-col-2/5 g-row-7/8  xxs:g-col-6/9 xxs:g-row-1/2"
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
            className=" bg-gradient-to-b from-gray2 to-gray1A  "
            gridPosition="g-col-1/3 g-row-4/5    xxs:g-col-4/6 xxs:g-row-3/4"
            src="/tool-logos/radix-ui.svg"
            size="w-6/10 filter-invert"
            alt="Radix-UI"
          />
          <Li
            className="bg-gradient-to-b from-sand1A via-orange1A to-orange3A "
            gridPosition="g-col-4/5 g-row-1/3  xxs:g-col-6/7 xxs:g-row-2/4"
            src="/tool-logos/astrojs.svg"
            alt="Astro"
            size=""
          />
          <Li
            className="  bg-gradient-to-b from-jade1A to-jade1A via-grass3A lt-xxs:a "
            gridPosition="g-col-2/3 g-row-3/4  xxs:g-col-7/9 xxs:g-row-2/4 "
            src="/tool-logos/nodejs.svg"
            alt="NodeJS"
            size="xxs:w-8/10"
            isGlowing={glowingCategory === "most-used"}
          />

          <Li
            className=" dark bg-gradient-to-b from-sand1A to-sand3A"
            gridPosition="g-col-1/4 g-row-5/7  xxs:g-col-4/7 xxs:g-row-4/6"
            src="/tool-logos/figma.svg"
            alt="Figma"
            size=""
          />

          {/* <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" /> */}
          <Li
            className="col-span-2 bg-gradient-to-b from-gray1A to-gray3 !display-none xxs:!flex "
            gridPosition="  xxs:g-col-7/9 xxs:g-row-4/5"
            src="/tool-logos/unocss.svg"
            alt="UnoCSS"
          />

          <Li
            className="col-span-2 bg-gradient-to-b from-cyan2A to-cyan3A"
            gridPosition="g-col-3/5 g-row-8/9  xxs:g-col-2/4 xxs:g-row-5/6"
            src="/tool-logos/tailwindcss.svg"
            alt="TailwindCSS"
            // size="w-4/5"
            isGlowing={glowingCategory === "most-used"}
          />
          <Li
            className="bg-gradient-to-b from-blue3A to-blue5 "
            gridPosition="g-col-1/3 g-row-8/9  xxs:g-col-1/3 xxs:g-row-4/5"
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
            className="bg-gradient-to-b from-purple3 to-purple4 light "
            gridPosition="g-col-1/2 g-row-7/8  xxs:g-col-1/2 xxs:g-row-5/6"
            src="/tool-logos/vite.svg"
            alt="Vite"
          />
          {/* <Li className="bg-pink5 light" icon="i-logos-deno" size="!w-2em !h-2em" alt="Deno" /> */}
          {/* <Li className="bg-grass3 light" icon="i-logos-nodejs" size="!w-2em !h-2em" alt="nodejs" /> */}
          {/* <Li className="bg-gray-50" icon="i-logos-mongodb" size="!w-2em !h-2em" alt="MongoDB" /> */}

          {/* <Li className="bg-sky-50" icon="i-logos-postgresql" size="!w-2em !h-2em" alt="PostgreSQL" /> */}
          <Li
            className="bg-gradient-to-b from-slate2A via-indigo3A to-indigo4A "
            gridPosition="g-col-4/5 g-row-6/7  xxs:g-col-8/9 xxs:g-row-5/6"
            src="/tool-logos/css.svg"
            alt="CSS"
            isGlowing={glowingCategory === "favorite"}
          />
          <Li
            className=" bg-gradient-to-b from-sand2A via-orange3A to-orange4A"
            gridPosition="g-col-4/5 g-row-5/6  xxs:g-col-7/8 xxs:g-row-5/6"
            src="/tool-logos/html.svg"
            alt="HTML"
          />

          <Li
            className=" bg-gradient-to-b from-sky1 via-sky2 to-sky3  "
            gridPosition="g-col-1/2 g-row-3/4  xxs:g-col-3/4 xxs:g-row-4/5"
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
      className={`toolkit__grid-item p-4  xxs:!p-3 xs:p-4 sm:p-4  flex justify-center items-center b-1.5 b-slate2A empty:b-transparent bg-origin-border ${props.className} ${
        props.gridPosition
      } ${props.isGlowing && "???"}`}
    >
      {props.icon && <Icon name={props.icon} className={`${props.size}`} />}
      {props.src && <img src={props.src} alt={props.alt} className={`object-cover  ${props?.size}`} />}
    </li>
  );
}
