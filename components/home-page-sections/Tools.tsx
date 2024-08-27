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
    <section className="relative isolate">
      <BluredCircle radius={200} top="100%" left="60%" bg="bg-bronze2A" blur="200px" />
      <BluredCircle radius={200} top="50%" left="70%" bg="bg-sage2A " blur="200px" />
      <BluredCircle radius={200} top="50%" left="20%" bg="bg-violet2A opacity-70" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="flex justify-between gap-8">
          <h2 className="H1" id="tools">
            Tools
          </h2>
          <div className="flex items-center gap-3">
            <ButtonWithToolTip
              label={
                <>
                  <Icon name="bf-i-ph-heart" />
                  <span className="sr-only">Show Favorite Tools</span>
                </>
              }
              category="favorite"
              tooltipContent={<p>Most loved</p>}
              glowingCategory={glowingCategory}
              isToolTipOpen={isToolitip1Open}
              setIsTooltipOpen={setIsTooltip1Open}
              setGlowingCategory={setGlowingCategory}
            />
            <ButtonWithToolTip
              label={
                <>
                  <Icon name="bf-i-ph-wrench" />
                  <span className="sr-only">Show Most Used Tools</span>
                </>
              }
              category="most-used"
              tooltipContent={<p>Most Used</p>}
              glowingCategory={glowingCategory}
              isToolTipOpen={isToolitip2Open}
              setIsTooltipOpen={setIsTooltip2Open}
              setGlowingCategory={setGlowingCategory}
            />
            <ButtonWithToolTip
              label={
                <>
                  <Icon name="bf-i-ph-syringe" />
                  <span className="sr-only">Show Painful-but-life-saving Tools</span>
                </>
              }
              category="painful"
              tooltipContent={<p>Painful, But Life Saving</p>}
              glowingCategory={glowingCategory}
              isToolTipOpen={isToolitip3Open}
              setIsTooltipOpen={setIsTooltip3Open}
              setGlowingCategory={setGlowingCategory}
            />
          </div>
        </div>
        <Space size="h-4" />

        <ul className="toolkit__grid">
          <Li
            className=" bg-gradient-to-br from-purple1A via-25%  to-mauve1A via-transparent c-white"
            borderGradeintFrom="from-violet4"
            gridPosition="g-col-1/4 g-row-1/3 xxs:g-col-1/4 xxs:g-row-1/4"
            src="/tool-logos/nextjs.svg"
            alt="NEXTjs"
            size="w-5/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            className=" bg-gradient-to-b from-sky1 to-sky3 "
            borderGradeintFrom="from-sky4A"
            gridPosition="g-col-3/5 g-row-3/5  xxs:g-col-4/6 xxs:g-row-1/3"
            src="/tool-logos/react.svg"
            alt="React"
            size="w-7/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            className="  bg-gradient-to-b from-transparent via-transparent  to-mint2A"
            borderGradeintFrom="from-green3A"
            gridPosition="g-col-2/5 g-row-7/8  xxs:g-col-6/9 xxs:g-row-1/2"
            src="/tool-logos/supabase.svg"
            size="w-7/10"
            alt="Supabase"
            isGlowing={glowingCategory === "favorite"}
            glowingCategory={glowingCategory}
          />

          {/* <Li
            className="  bg-violet4 light "
            src="/tool-logos/pwa.svg"
            alt="Progressive Web Applications"
          /> */}
          <Li
            className=" bg-gradient-to-b from-mauve1A via-mauve1 to-mauve2A c-gold12 "
            borderGradeintFrom="from-gold4A"
            gridPosition="g-col-1/3 g-row-4/5    xxs:g-col-4/6 xxs:g-row-3/4"
            src="/tool-logos/radix-ui.svg"
            size="w-6/10 filter-invert"
            alt="Radix-UI"
            glowingCategory={glowingCategory}
          />
          <Li
            className="bg-gradient-to-b from-bronze1A via-orange1A via-55% to-orange3A "
            borderGradeintFrom="from-amber3A"
            gridPosition="g-col-4/5 g-row-1/3  xxs:g-col-6/7 xxs:g-row-2/4"
            src="/tool-logos/astrojs.svg"
            alt="Astro"
            size=""
            glowingCategory={glowingCategory}
          />
          <Li
            className="  bg-gradient-to-b from-transparent via-transparent  to-lime2A  lt-xxs:a "
            borderGradeintFrom="from-lime4A"
            gridPosition="g-col-2/3 g-row-3/4  xxs:g-col-7/9 xxs:g-row-2/4 "
            src="/tool-logos/nodejs.svg"
            alt="NodeJS"
            size="xxs:w-8/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />

          <Li
            className=" dark bg-gradient-to-b from-sand1A via-sand1A to-bronze2A"
            borderGradeintFrom="from-bronze5A"
            gridPosition="g-col-1/4 g-row-5/7  xxs:g-col-4/7 xxs:g-row-4/6"
            src="/tool-logos/figma.svg"
            alt="Figma"
            size=""
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />

          {/* <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" /> */}
          <Li
            className="col-span-2 bg-gradient-to-b from-transparent via-transparent to-bronze2 !hidden xxs:!flex justify-center"
            borderGradeintFrom="from-sand4A"
            gridPosition="  xxs:g-col-7/9 xxs:g-row-4/5"
            src="/tool-logos/unocss.svg"
            alt="UnoCSS"
            glowingCategory={glowingCategory}
          />

          <Li
            className="col-span-2 bg-gradient-to-b from-cyan2A to-cyan3A"
            borderGradeintFrom="from-cyan4A"
            gridPosition="g-col-3/5 g-row-8/9  xxs:g-col-2/4 xxs:g-row-5/6"
            src="/tool-logos/tailwindcss.svg"
            alt="TailwindCSS"
            // size="w-4/5"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            className="bg-gradient-to-b from-transparent via-transparent to-blue1A  "
            borderGradeintFrom="from-sky4A"
            gridPosition="g-col-1/3 g-row-8/9  xxs:g-col-1/3 xxs:g-row-4/5"
            src="/tool-logos/solidjs.svg"
            size="w-8/10"
            alt="Solidjs"
            isGlowing={glowingCategory === "favorite"}
            glowingCategory={glowingCategory}
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
            className="bg-gradient-to-b from-purple1 to-purple4  "
            borderGradeintFrom="from-purple5A"
            gridPosition="g-col-1/2 g-row-7/8  xxs:g-col-1/2 xxs:g-row-5/6"
            src="/tool-logos/vite.svg"
            alt="Vite"
            glowingCategory={glowingCategory}
          />
          {/* <Li className="bg-pink5 light" icon="i-logos-deno" size="!w-2em !h-2em" alt="Deno" /> */}
          {/* <Li className="bg-grass3 light" icon="i-logos-nodejs" size="!w-2em !h-2em" alt="nodejs" /> */}
          {/* <Li className="bg-olive-50" icon="i-logos-mongodb" size="!w-2em !h-2em" alt="MongoDB" /> */}

          {/* <Li className="bg-sky-50" icon="i-logos-postgresql" size="!w-2em !h-2em" alt="PostgreSQL" /> */}
          <Li
            className="bg-gradient-to-b from-slate2A via-indigo3A to-indigo4A "
            borderGradeintFrom="from-indigo4A"
            gridPosition="g-col-4/5 g-row-6/7  xxs:g-col-8/9 xxs:g-row-5/6"
            src="/tool-logos/css.svg"
            alt="CSS"
            isGlowing={glowingCategory === "favorite"}
            glowingCategory={glowingCategory}
          />
          <Li
            className=" bg-gradient-to-b from-base2A via-orange3A to-orange4A"
            borderGradeintFrom="from-orange4A"
            gridPosition="g-col-4/5 g-row-5/6  xxs:g-col-7/8 xxs:g-row-5/6"
            src="/tool-logos/html.svg"
            alt="HTML"
            glowingCategory={glowingCategory}
          />

          <Li
            className=" bg-gradient-to-b from-sky1 via-sky2 to-sky3  "
            borderGradeintFrom="from-sky4"
            gridPosition="g-col-1/2 g-row-3/4  xxs:g-col-3/4 xxs:g-row-4/5"
            src="/tool-logos/typescript.svg"
            alt="TypeScript"
            size="w-9/10"
            isGlowing={glowingCategory === "painful"}
            glowingCategory={glowingCategory}
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
      className={`toolkit__grid-item empty:b-transparent bg-origin-border relative isolate ${props.className} ${
        props.gridPosition
      } 
      ${props.glowingCategory && !props.isGlowing ? "grayscale-100" : ""}
      `}
    >
      <GradientBorderLayer borderGradeintFrom={props?.borderGradeintFrom} />
      <div className="flex justify-center items-center p-4  xxs:!p-3 xs:p-4 sm:p-4 h-full">
        {props.icon && <Icon name={props.icon} className={`${props.size}`} />}
        {props.src && <img src={props.src} alt={props.alt} className={`object-cover  ${props?.size}`} />}
      </div>
    </li>
  );
}

function GradientBorderLayer({
  borderGradeintFrom = "from-slate4A",
  borderGradeintTo = "salte3A",
  borderGradientVia = "via-slate2A",
}) {
  return (
    <div
      style={{
        // gridArea: "1/1/-1/-1",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: "inherit",
        // overflow: 'clip',
        // borderWidth: 'inherit',
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundClip: "border-box",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor" /*5'*/,
        maskComposite: "exclude" /*5*/,
        backdropFilter: "blur(5px)",
        // zIndex: 9,
      }}
      className={` bg-gradient-to-br ${borderGradeintFrom} ${borderGradientVia} ${borderGradeintTo} b-1 mix-blend-screen `}
    ></div>
  );
}

function ButtonWithToolTip({
  label,
  category,
  tooltipContent,
  glowingCategory,
  isToolTipOpen,
  setIsTooltipOpen,
  setGlowingCategory,
}) {
  return (
    <ToolTip
      open={glowingCategory === category || isToolTipOpen}
      setOpen={setIsTooltipOpen}
      trigger={
        <Button
          iconButton
          variation={glowingCategory === category ? "outline-accent" : "ghost"}
          onClick={() => {
            if (glowingCategory === category) {
              setGlowingCategory(null);
            } else {
              setGlowingCategory(category);
            }
          }}
          className={`!b-transparent relative !b-0 !rd-2 !bg-transparent  hover:bg-gradient-to-b from-transparent ${
            glowingCategory === category ? "bg-gradient-to-b to-cyan3A" : " to-base3A"
          }`}
        >
          <GradientBorderLayer
            borderGradeintFrom={glowingCategory === category ? "from-accent5" : "from-base5"}
            borderGradientVia={glowingCategory === category ? "from-accent5" : "from-base5"}
            borderGradeintTo={glowingCategory === category ? "from-accent5" : "from-base5"}
          />
          {label}
        </Button>
      }
    >
      {tooltipContent}
    </ToolTip>
  );
}
