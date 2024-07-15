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
import Space from "../ui/Space";
import Icon from "@/components/ui/Icon";
import DesktopOnly from "../ui/DesktopOnly";
import MobileOnly from "../ui/MobileOnly";

export default function Process() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <section className=" relative ">
      <BluredCircle radius={200} top="100%" left="95%" bg="bg-brand-light-blue" blur="200px" />
      <BluredCircle radius={100} top="0%" left="5%" bg="bg-brand-light-amber" blur="200px" />

      <div className="max-w-70rem mx-auto">
        <h2 className="H2 c-title  pb-4">My Design Process</h2>
        <p className="c-melow max-w-50ch">{t("home:how.description")}</p>
        <div className="h-8 md:h-20  "></div>
        <ol className="relative isolate grid grid-cols-1 md:grid-cols-4  ">
          <DashedLine />
          <ProcessCard
            title={locale === "en" ? "Choose a Class" : "انتخاب کلاس"}
            stepNumber={1}
            description={t("home:how.one")}
          />
          <ProcessCard
            title={locale === "en" ? "Free Intro Session" : "جلسه معرفی رایگان"}
            stepNumber={2}
            description={t("home:how.two")}
          />
          <ProcessCard
            title={locale === "en" ? "Book Sessions" : "رزرو جلسه‌ها"}
            stepNumber={3}
            description={t("home:how.three")}
          />
          <ProcessCard
            title={locale === "en" ? "Keep Learning" : "ادامه یادگیری"}
            stepNumber={4}
            description={t("home:how.four")}
          />
        </ol>
        <Space size="h-12" />
        <div className="text-end">
          <En>
            <Link href="/process">
              Check our visual step-by-step guide
              <Icon name="bf-i-ph-arrow-right mis-2" />
            </Link>
          </En>

          <Fa>
            <Link href="/process">
              راهنمای دیداری مراحل 
              <Icon name="bf-i-ph-arrow-left mis-2" />
            </Link>
          </Fa>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ stepNumber, title = "", description }) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <li className=" flex  md:flex-col items-stretch  ">
      <ItemNumber number={locale === "fa" ? persianJs(stepNumber.toString()).englishNumber().toString() : stepNumber} />
      <div className="md:h-12"></div>
      <div className=" grid content-center  lt-md:pis-4 md:pt-6 md:pis-8  ">
        <h3 className="font-bold text-xl sm:text-2xl font-display leading-8 ">
          <span>{title}</span>
        </h3>
        <p className="leading-5 c-melow lt-md:text-sm">{description}</p>
      </div>
    </li>
  );
}

function ItemNumber({ number }) {
  return (
    <div
      className={`  flex flex-col md:flex-row justify-center  w-full content-center items-center 
       lt-sm:max-w-20 lt-sm:min-w-20 
       lt-md:max-w-25 lt-md:min-w-25 
       lt-md:min-h-35 
       `}
      style={{
        flexGrow: 0,
      }}
    >
      {/* <DashedLine /> */}
      <NumberCircle number={number} />
      {/* <DashedLine /> */}
    </div>
  );
}

function DashedLine({ className }: { className?: string }) {

  const {locale} = useRouter();
  return (
    <>
      {/* <hr className={` -z-10 absolute grow 
  lt-md:top-0 lt-md:bottom-0 lt-md:mx-11
  md:left-0 md:right-0 md:my-10
  ${className}`}
  style={{
    height: "10px",
    backgroundImage: 
    "linear-gradient(90deg, transparent, transparent 50%, #fff 50%, #fff 100%), linear-gradient(90deg, #FCC375, #FFA2A2)",
    backgroundSize: "30px 8px, 100% 8px",
    backgroundRepeat: 'none, repeat-x',
    border: "none"
  }}
  /> */}
      <div className="md:contents display-none">
        <div className={`absolute -z-10 -top-12  w-full  ${locale === 'fa' && 'scale-x--100'}`} >
          <img src="/static/process-line.svg" className="w-full h-full " />
        </div>
      </div>
      <div className="lt-md:contents md:display-none">
        <div className={`absolute -z-10  top-0 bottom-0 ${locale === 'en' ? "left-4" : "-right-12 scale-x--100"} `}>
          <img src="/static/process-line-vertical.svg" className="h-full " />
        </div>
      </div>
    </>
  );
}

function NumberCircle({ number }) {
  return (
    <div className="rd-full w-16 h-16 md:w-22 md:h-22 bg-brand-warm-black shd-3 flex justify-center items-center shd-tinted-3">
      <span className="text-3xl md:text-5xl font-display c-white ">{number}</span>
    </div>
  );
}
