"use client";

import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import Button from "../ui/button";
import ToolTip from "../ui/Tooltip";
import { useState } from "react";
import GradientBorderOverlay from '../ui/GradientBorderOverlay';

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
              tooltipContent={<p>Painful, But Life Saving!</p>}
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
            className="  c-white"
            bgGradient="!bg-gradient-to-br from-purple1A via-25%  to-purple1 via-transparent"
            borderGradeintFrom="from-violet4"
            glowColor="bg-violet3A"
            glowBlur="blur-90"
            glowOpacity="opacity-30"
            gridPosition="g-col-1/4 g-row-1/3 xxs:g-col-1/4 xxs:g-row-1/4"
            src="/tool-logos/nextjs.svg"
            alt="NEXTjs"
            size="w-5/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient=" bg-gradient-to-br from-transparent   to-sky2A  "
            borderGradeintFrom="from-sky4A"
            glowColor="bg-sky3A"
            glowBlur="blur-70"
            glowOpacity="opacity-40"
            gridPosition="g-col-3/5 g-row-3/5  xxs:g-col-4/6 xxs:g-row-1/3"
            src="/tool-logos/react.svg"
            alt="React"
            size="w-7/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient="  bg-gradient-to-b from-transparent via-transparent  to-mint2A"
            borderGradeintFrom="from-green3A"
            glowColor="bg-mint3A"
            glowBlur="blur-80"
            glowOpacity="opacity-60"
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
            bgGradient=" bg-gradient-to-b from-mauve1A via-mauve1 to-mauve2A "
            borderGradeintFrom="from-gold4A"
            glowColor="bg-gold3A"
            gridPosition="g-col-1/3 g-row-4/5    xxs:g-col-4/6 xxs:g-row-3/4"
            src="/tool-logos/radix-ui.svg"
            size="w-6/10 filter-invert"
            alt="Radix-UI"
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient="bg-gradient-to-b from-bronze1A via-orange1A via-55% to-orange3A "
            borderGradeintFrom="from-amber3A"
            glowColor="bg-amber3A"
            gridPosition="g-col-4/5 g-row-1/3  xxs:g-col-6/7 xxs:g-row-2/4"
            src="/tool-logos/astrojs.svg"
            alt="Astro"
            size=""
            glowingCategory={glowingCategory}
          />
          <Li
            className="lt-xxs:a"
            bgGradient="bg-gradient-to-b from-transparent from-30%  to-lime3A "
            borderGradeintFrom="from-lime4A"
            glowColor="bg-lime3A"
            glowBlur="blur-50"
            glowOpacity='opacity-50'
            gridPosition="g-col-2/3 g-row-3/4  xxs:g-col-7/9 xxs:g-row-2/4 "
            src="/tool-logos/nodejs.svg"
            alt="NodeJS"
            size="xxs:w-8/10"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />

          <Li
            bgGradient=" dark bg-gradient-to-b from-sand1A via-sand1A to-bronze2A"
            borderGradeintFrom="from-bronze5A"
            glowColor="bg-ruby3A"
            glowBlur="blur-90"
            glowOpacity='opacity-30'
            gridPosition="g-col-1/4 g-row-5/7  xxs:g-col-4/7 xxs:g-row-4/6"
            src="/tool-logos/figma.svg"
            alt="Figma"
            size=""
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />

          {/* <Li className="bg-violet-100" src="/tool-logos/framer-motion.png" size="w-9/10" alt="Framer Motion" /> */}
          <Li
            className="!hidden xxs:!flex col-span-2 justify-center"
            bgGradient=" bg-gradient-to-b from-transparent via-transparent to-bronze2 "
            borderGradeintFrom="from-sand4A"
            glowColor="bg-sand3A"
            gridPosition="  xxs:g-col-7/9 xxs:g-row-4/5"
            src="/tool-logos/unocss.svg"
            alt="UnoCSS"
            glowingCategory={glowingCategory}
          />

          <Li
            className="col-span-2"
            bgGradient=" bg-gradient-to-b from-cyan2A to-cyan3A"
            borderGradeintFrom="from-cyan4A"
            glowColor="bg-cyan3A"
            gridPosition="g-col-3/5 g-row-8/9  xxs:g-col-2/4 xxs:g-row-5/6"
            src="/tool-logos/tailwindcss.svg"
            alt="TailwindCSS"
            // size="w-4/5"
            isGlowing={glowingCategory === "most-used"}
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient="bg-gradient-to-b from-transparent via-transparent to-blue1A  "
            borderGradeintFrom="from-sky4A"
            glowColor="bg-sky3A"
            glowBlur="blur-50"
            glowOpacity="opacity-80"
            gridPosition="g-col-1/3 g-row-8/9  xxs:g-col-1/3 xxs:g-row-4/5"
            src="/tool-logos/solidjs.svg"
            size="w-8/10"
            alt="Solidjs"
            isGlowing={glowingCategory === "favorite"}
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient="bg-gradient-to-b from-purple1 to-purple4  "
            borderGradeintFrom="from-purple5A"
            glowColor="bg-purple3A"
            gridPosition="g-col-1/2 g-row-7/8  xxs:g-col-1/2 xxs:g-row-5/6"
            src="/tool-logos/vite.svg"
            alt="Vite"
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient="bg-gradient-to-b from-slate2A via-indigo3A to-indigo4A "
            borderGradeintFrom="from-indigo4A"
            glowColor="bg-indigo3A"
            gridPosition="g-col-4/5 g-row-6/7  xxs:g-col-8/9 xxs:g-row-5/6"
            src="/tool-logos/css.svg"
            alt="CSS"
            isGlowing={glowingCategory === "favorite"}
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient=" bg-gradient-to-b from-base2A via-orange3A to-orange4A"
            borderGradeintFrom="from-orange4A"
            glowColor="bg-orange3A"
            gridPosition="g-col-4/5 g-row-5/6  xxs:g-col-7/8 xxs:g-row-5/6"
            src="/tool-logos/html.svg"
            alt="HTML"
            glowingCategory={glowingCategory}
          />
          <Li
            bgGradient=" bg-gradient-to-b from-sky1 via-sky2 to-sky3  "
            borderGradeintFrom="from-sky4"
            glowColor="bg-sky3A"
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
      className={`toolkit__grid-item empty:b-transparent bg-origin-border relative isolate  ${props.className} ${
        props.gridPosition
      } 
      ${props.glowingCategory && !props.isGlowing ? "grayscale-95" : "grayscale-0"}
      transition-filter duration-1s ease
      `}
    >
      <GlowOverlay
        className={`-z-3 rd-inherit  ${props?.glowColor ?? "bg-base4A"} 
        ${props.glowBlur ?? "blur-20"} mix-blend-overlay 
        ${props.glowingCategory && props.isGlowing ? props.glowOpacity ?? "opacity-100": "opacity-0"}
        transition-filter transition-opacity duration-1s ease`}
      />
      <BgOverlay className="bg-base1 opacity-30 rd-inherit -z-2 backdrop-blur-20" />
      <BgOverlay className={` rd-inherit -z-1 bg-gradient-to-b ${props.bgGradient}`} style={{
        "--un-gradient-shape": "135deg"
      }}/>

      <GradientBorderOverlay from={props?.borderGradeintFrom} to="to-transparent" direction='135deg' />
      <GradientBorderOverlay from="from-transparent" direction='135deg' />
      <div className="flex justify-center items-center p-4  xxs:!p-3 xs:p-4 sm:p-4 h-full">
        {props.icon && <Icon name={props.icon} className={`${props.size}`} />}
        {props.src && <img src={props.src} alt={props.alt} className={`object-cover  ${props?.size}`} />}
      </div>
    </li>
  );
}


function BgOverlay({ className, style = {} }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        ...style
      }}
      className={`${className}`}
    ></div>
  );
}

function GlowOverlay({ className }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      className={`${className}`}
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
          className={`!b-transparent relative !b-0 !rd-2 !bg-transparent    hover:bg-gradient-to-b from-transparent ${
            glowingCategory === category ? "bg-gradient-to-b to-cyan3A !c-cyan9" : " to-cyan2A"
          } transition ease duration-150ms`}
        >
          <GlowOverlay
            className={`-z-1 bg-cyan3A blur-20 mix-blend-overlay ${
              glowingCategory === category ? "opacity-100" : "opacity-0"
            }`}
          />
          <GradientBorderOverlay
            from={glowingCategory === category ? "from-accent5A" : "from-base5A"}
            via={glowingCategory === category ? "via-accent2A" : "via-base2A"}
            to="transparent"
            direction='135deg'
          />
            <GradientBorderOverlay
            from="transparent"
            via={glowingCategory === category ? "via-accent2A" : "via-base2A"}
            to={glowingCategory === category ? "to-accent4A" : "to-base4A"}
            direction='135deg'
          />
          {label}
        </Button>
      }
    >
      {tooltipContent}
    </ToolTip>
  );
}
