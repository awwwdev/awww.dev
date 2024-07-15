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
import Space from "../ui/Space";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import MobileOnly from "../ui/MobileOnly";
import DesktopOnly from "../ui/DesktopOnly";

export default function Testomonials() {
  const { locale } = useRouter();

  return (
    <section className="   ">
      <div className="p-4">
        <div className="mx-auto max-w-page ">
          <BluredCircle radius={200} top="100%" left="0%" bg="bg-blue3" blur="200px" />
          <BluredCircle radius={100} top="0%" left="5%" bg="bg-amber2" blur="200px" />
          <En>
            <h2 className="H2 c-title ">What people say</h2>
          </En>
          <Fa>
            <h2 className="H2 c-title "> نظر کاربران</h2>
          </Fa>
          <Space size="h-12" />
        </div>
      </div>
      <div className="md:p-4">
        <div className='blcok md:display-none'>
          <div className="-mx-4">
            <ul className="flex items-end gap-2  overflow-x-auto pb-4 w-full  ">
              <Testomonial1 />
              <Testomonial2 />
              <Testomonial3 />
              <Testomonial4 />
              <Testomonial5 />
            </ul>
          </div>
        </div>
        <div className='display-none md:block'>
          <div className="mx-auto max-w-page">
            <ul
              className="gap-4 pb-4 w-full flex "
              style={{ gridTemplateColumns: "2fr 3fr" }}
              // style={{
              //   gridTemplateColumns: "repeat(30, auto)",
              //   gridTemplateRows: "repeat(5, auto)",
              //   gridAutoFlow: "dense",
              //   rowGap: "0.5rem",
              //   columnGap: "1.25rem",
              // }}
            >
              <div className=" flex-basis-35%">
                <Testomonial1 />
              </div>
              <div className="flex-basis-65%">
                <div className="grid gap-4  " style={{ gridTemplateColumns: "2fr 3fr " }}>
                  <Testomonial2 />
                  <Testomonial3 />
                </div>
                <div className="grid gap-4" style={{ gridTemplateColumns: "3fr 2fr" }}>
                  <Testomonial4 />
                  <Testomonial5 />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mx-auto max-w-page ">{/* Other Contents */}</div>
      </div>
    </section>
  );
}

function TestomonialCard({ children, name, gridRow, gridColumn, bg, color, subject, from, className = "" }) {
  return (
    <li
      className={` grid  h-full  ${className} `}
      style={{flexBasis: "55%", flexShrink: "0", gridTemplateRows: "1fr auto" }}
    >
      <MessageBubble bg={bg} color={color}>
        {children}
      </MessageBubble>
      <Space size="h-1" />
      <div className="grid  gap-1 items-center leading-4">
        <p className="fw-500 text-xl tracking-tight font-display c-melow leading-5">{name}</p>
        <div className="text-xs c-subdued leading-3.5 c-sand11">
          <p>
            <En>from</En>
            <Fa>از</Fa>
            {` `}
            {from}
          </p>
          <p>
            <Fa>کلاس</Fa>
            {` `}
            {subject}
            {` `}
            <En>class</En>
          </p>
        </div>
      </div>
    </li>
  );
}

function MessageBubble({ children, bg, color }) {
  const { locale } = useRouter();
  return (
    <div
      className="h-full grid "
      style={{
        gridTemplateRows: "1fr auto",
      }}
    >
      <div className={` ${bg} p-6  rd-xl `}>
        <p className="text-sm tracking-wide grid h-full" style={{ gridTemplateRows: "auto 1fr auto" }}>
          <div className="opacity-30 ">
            <Icon
              name="bf-i-ph-quotes-fill"
              className={`inline-block  ${
                locale === "en" && "scale-x--100"
              } vertical-bottom   text-4xl mie-2 c-brand-warm-black before:opacity-50`}
            />
          </div>
          {children}
          <div className="flex justify-end -mt-5 opacity-30">
            <Icon
              name="bf-i-ph-quotes-fill"
              className={`text-2xl inline-block ${
                locale === "fa" && "scale-x--100"
              }   vertical-top mis-2 c-brand-warm-black before:opacity-
            50 `}
            />
          </div>
        </p>
      </div>
      <div className={`flex px-5 ${locale === "fa" && "scale-x--100 justify-end "}`}>
        <Triangle color={color} bg={bg} />
      </div>
    </div>
  );
}

function Triangle({ color, bg }) {
  return (
    <div className={`scale-x--100 ${color}`}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={
          {
            // filter: "drop-shadow(-5px 10px 10px  #dacac0)",
          }
        }
      >
        <path d="M20 0H0L16.5858 16.5858C17.8457 17.8457 20 16.9534 20 15.1716V0Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function Testomonial1() {
  const { locale } = useRouter();

  return (
    <TestomonialCard
      name={locale === "en" ? "Ghazal" : "سحر"}
      gridRow="1/5"
      gridColumn="1/10"
      bg="bg-[#FEDBC2]"
      color="c-[#FEDBC2]"
      from={locale === "en" ? "Australia" : "تورنتو"}
      subject={locale === "en" ? "Chess Class" : "شطرنج"}
      className="lt-sm:pis-4  "
    >
      <En>
        {/* <div className="sm:text-lg grid ">
          He is a great violin teacher, professional, and passionate about his work.
          <br />
          I’m happy to see that my son enjoys playing violin and never takes it as a burden.
          I highly recommend him to everyone.
        </div> */}
        <div className='text-base sm:text-lg'>
        We are very happy with the Chess classes. He not only teaches my son Chess but also encourages him and gives him confidence. I think his approach to teaching is effective and valuable. He is always happy to communicate about my {`son’s`} progress and what he needs to do to improve. He is flexible with timing and is always very understanding. He sends us a reminder a day before each class which is great for adjusting time and plans. We really appreciate his efforts. Thank you!
        </div>
      </En>
      {/* <Fa>
        پسر من که ده ساله هست و هیچ علاقه ای به زبان فارسی نشان نمیداد بعد از مدت کوتاهی که از کلاسهاش گذشت از من فارسی
        کلمات را میپرسه و شروع به ساختن جمله های کوتاه فارسی کرده است.
      </Fa> */}
      <Fa>
      ایشون بسیار معلم باهوش، با حوصله، متعهد به کار و باسواد در شطرنج هستن. رابطه بسیار دوستانه و‌ در عین حال حرفه ای با پسر ۱۳ ساله من سر جلسه ها داشتن و همین باعث علاقمندی بیشتر پسرم به شطرنج شده. با جملات تشویقی و‌انگیزشی سر کلاس، باعث‌ میشدن‌ که کلاس یکنواخت نباشه و اصلا پسرم گذر زمان رو متوجه نمیشد. بعد از هر جلسه تمرین میفرستادن و‌ همیشه به من فیدبک میدادن. با تشکر از ایشون و‌ براشون آرزوی موفقیت دارم .
      </Fa>
      {/* <Fa>
یاسمن: از هر لحظه کلاس لذت بردم . روش تدریس بسیار عالی و با صبر و حوصله و علاقه که باعث شد دوباره پیانو زدن
را شروع کنم و همیشه مشتاق جلسه بعدی باشم.
</Fa> */}
    </TestomonialCard>
  );
}

function Testomonial2() {
  const { locale } = useRouter();

  return (
    <TestomonialCard
      name={locale === "en" ? "Atefeh" : "بهناز"}
      gridRow="1/3"
      gridColumn="10/22"
      bg="bg-brand-light-green"
      color="c-brand-light-green"
      from={locale === "en" ? "United States" : "تورنتو"}
      subject={locale === "en" ? "Piano" : "ریاضی"}
    >
      <En>
        <div className="">
          She is wonderful. She is so flexible and easy to work with. Her fluency in both Farsi and English makes it
          really easy for the kids to understand her. In general, she is a 5-star teacher.
        </div>
        
      </En>
      <Fa>
        ايشون بسيار معلم با سواد و با حوصله اى هستند و روى درک و يادگيرى مطلب بسيار كوشا، ارتباط بسيار خوبى برقرار مى
        كنند و براى بچه هایی كه تفاوت زبان و فرهنگى دارن يادگيرى رو آسون مى كنن، مرسى از درسون كه اين امكان رو براى ما
        پيش آورده.
      </Fa>
    </TestomonialCard>
  );
}

function Testomonial3() {
  const { locale } = useRouter();

  return (
    <TestomonialCard
      name={locale === "en" ? "Kaveh & Andrea" : "شکوفه"}
      gridRow="1/3"
      gridColumn="22/30"
      bg="bg-[#F8DEDE]"
      color="c-[#F8DEDE]"
      from={locale === "en" ? "Canada" : "تورنتو"}
      subject={locale === "en" ? "Fitness" : "برنامه‌نویسی"}
    >
      <En>
        She is a great fitness instructor who has helped us with rehabilitation and strengthening. Over the many months
        we see clear improvement in our fitness and looking forward to continuing our sessions.
      </En>
      <Fa>
        من دوره رو برای خودم خریدم. یکی از بزرگترین مزایا برای من راحتی هماهنگ کردن دوره با برنامه‌ کار و خانواده ام
        بود. مزیت دوم هماهنگ کردن ‌‌سرعت کلاس با میزان درک من از هر قسمتی بود.
      </Fa>
    </TestomonialCard>
  );
}

function Testomonial4() {
  const { locale } = useRouter();

  return (
    <TestomonialCard
      name={locale === "en" ? "Maryam" : "مهسا"}
      gridRow="3/5"
      gridColumn="10/18"
      bg="bg-[#DEE1FF]"
      color="c-[#DEE1FF]"
      from={locale === "en" ? "Australia" : "تورنتو"}
      subject={locale === "en" ? "Programming" : "فرانسه"}
    >
      <En>
        His teaching method is awesome and very clear. He&apos;s made programming so easy to understand. I recommend him
        to anyone struggling with Python.
      </En>
      <Fa>
        دختر شش ساله من روزهایی که کلاس فرانسه داره با ذوق از خواب بیدار میشه و بعد از کلاس هم کلی انرژی داره .در مدت ۵
        جلسه خیلی مطلب یاد گرفته و دوست داره کارتونهای فرانسه ببینه.
      </Fa>
    </TestomonialCard>
  );
}

function Testomonial5() {
  const { locale } = useRouter();

  return (
    <TestomonialCard
      name={locale === "en" ? "Aida" : "آسیه"}
      gridRow="3/5"
      gridColumn="18/30"
      bg="bg-[#FBEBC7]"
      color="c-[#FBEBC7]"
      from={locale === "en" ? "Canada" : "؟؟؟"}
      subject={locale === "en" ? "Math" : "پیانو"}
      className="lt-sm:pie-4"
    >
      <En>
        He is really good at making connections with the kids. He is also very dedicated to his work and I like that he
        sends some homework so my daughter always has something to practice
      </En>
      <Fa>
        ایشون خیلی سریع تونستن با پسر من ارتباط برقرار کنند و رو آهنگی که دوست داشت موارد درسیشون را یاد بدن. کلاسها
        خیلی منظم و با برنامه هست همیشه. پسر من فعلا بدون اینکه من بگم دوست داره تمرین پیانو بکنه !
      </Fa>
    </TestomonialCard>
  );
}
