import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { En, Fa } from "@/components/ui/multilang";
import BluredCircle from "./BluredCircle";
import Space from "../ui/Space";
import Icon from "../ui/Icon";
import DesktopOnly from '../ui/DesktopOnly';
import MobileOnly from '../ui/MobileOnly';

const statsData = {
  sessions: {
    numberLong: "+100,000",
  },
  topics: {},
  teachers: {},
  students: {},
};

export default function Stats() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const supabase = useSupabaseClient();

  // const topicQ = useQuery({
  //   queryKey: ["topicHomepage-1"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase.from("topic").select(`id`);
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  // const teacherQ = useQuery({
  //   queryKey: ["teacherHomepage-1"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase.from("teacher").select(`id`);
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  // const studentQ = useQuery({
  //   queryKey: ["studentHomepage-1"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase.from("student").select(`id`);
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  // const sessionQ = useQuery({
  //   queryKey: ["sessionHomepage-1"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase.from("session").select(`id`);
  //     if (error) throw error;
  //     return data;
  //   },
  // });

  return (
    <section className="relative">
      <BluredCircle radius={200} top="0%" left="0%" bg="bg-brand-light-pink" blur="200px" />
      <BluredCircle radius={100} top="90%" left="95%" bg="bg-brand-light-amber" blur="200px" />
      <div className="max-w-70rem mx-auto ">
        {/* {renderNoData(topicQ) ?? renderNoData(teacherQ) ?? renderNoData(studentQ) ?? renderNoData(sessionQ) ?? ( */}
        <div className="">
          <h2 className="sr-only H2 c-title">{t("home:statistics.title")}</h2>
          <div className="h-4"></div>
          <ul
            className=" mx-auto justify-center "
            style={{ gridTemplateColumns: "repeat(4 , auto)", gridTemplateRows: "auto auto", gridAutoFlow: "dense" }}
          >
            <div className="flex justify-center gap-8 items-center w-full">
              {/* <div className="grow h-10 bg-orange4"></div> */}
              {/* <div className="grow h-10 bg-orange4"></div> */}
            </div>
            <Space size="h-18" />

            <div
              className={`
             flex justify-between
                gap-6
                
                lt-sm:grid
                lt-sm:justify-center
                `}
              style={{
                gridTemplateAreas: "'a b' 'c d' 'e e'",
              }}
            >
              <SessionStat />
              <StudentStat />
              <TopicStat />
              <TeacherStat />
              <RatingStat />
            </div>
          </ul>
        </div>
        {/* )} */}
      </div>
    </section>
  );
}

function SessionStatOld() {
  return (
    <li className="text-center">
      <p className="font-display grid ">
        <span className="primary-gradient c-transparent bg-clip-text  text-7xl sm:text-9xl  tracking-tighter fw-700">
          <Fa>+۱۰۰هزار</Fa>
          <En>+100k</En>
        </span>
        <span className="mis-2 text-4xl sm:text-7xl tracking-tight leading-5 sm:leading-10 tracking-tighter c-melow">
          <En>Sessions</En>
          <Fa>جلسه</Fa>
        </span>
      </p>
    </li>
  );
}

function SessionStat() {
  return (
    <Stat
      number={
        <span className="">
          <Fa>+۱۰۰هزار</Fa>
          <En>+100k</En>
        </span>
      }
      label={
        <>
          <En>Sessions</En>
          <Fa>جلسه</Fa>
        </>
      }
    />
  );
}

function StudentStat() {
  return (
    <Stat
      number={
        <>
          <Fa>+۳۰۰۰</Fa>
          <En>+3000</En>
        </>
      }
      label={
        <>
          <En>Students</En>
          <Fa>جلسه</Fa>
        </>
      }
    />
  );
}

function TopicStat() {
  return (
    <Stat
      number={
        <>
          {" "}
          <Fa>+۱۰۰</Fa>
          <En>+100</En>
        </>
      }
      label={
        <>
          <En>Topics</En>
          <Fa>جلسه</Fa>
        </>
      }
    />
  );
}

function TeacherStat() {
  return (
    <Stat
      number={
        <>
          {" "}
          <Fa>+۲۰۰</Fa>
          <En>+200</En>
        </>
      }
      label={
        <>
          <En>Tutors</En>
          <Fa>آموزگار</Fa>
        </>
      }
    />
  );
}

function RatingStat() {
  const { locale } = useRouter();
  return (
    <Stat
    className='grid-col-span-2 lt-sm:text-center '
      number={
        <span className={`inline-flex items-center text-0.8em  ${locale === "fa" && "flex-row-reverse"} `}>
       <DesktopOnly>

        <En>4.9</En>
        <Fa>۴.۹ </Fa>
       </DesktopOnly>
        {` `}
          <Icon name="bf-i-ph-star-fill" className="c-brand-orange !before:scale-90 mis-1" subdued={false} />
          <Icon name="bf-i-ph-star-fill" className="c-brand-orange !before:scale-90" subdued={false} />
          <Icon name="bf-i-ph-star-fill" className="c-brand-orange !before:scale-90" subdued={false} />
          <Icon name="bf-i-ph-star-fill" className="c-brand-orange !before:scale-90" subdued={false} />
          <Icon name="bf-i-ph-star-fill" className="c-brand-orange !before:scale-90" subdued={false} />
        </span>
      }
      label={
        <span   className={`lt-sm:text-3xl  ${locale === "en" && "tracking-tighter"} lt-sm:fw-700 !lt-sm:leading-0.9em`}>
<MobileOnly>

<En>4.9</En>
<Fa>۴.۹ </Fa>
{` `}
</MobileOnly>
          <En>Average Rating</En>
                <Fa>میانگین امتیار‌ها</Fa>
        </span>
      }
    />
  );
}

function Stat({ number, label, className = "" }) {
  const { locale } = useRouter();

  return (
    <li
      className={` px-2 py-2
    ${className}`}
    >
      <p className="font-display grid ">
        <span
          className={`text-4xl sm:text-3xl md:text-4xl ${locale === "en" && "tracking-tighter"} fw-700 !leading-0.9em`}
        >
          {number}
        </span>
        <span className=" text-xl  sm:text-xl  md:text-2xl tracking-tight  tracking-tighter c-melow !leading-0.9em fw-400">
          {label}
        </span>
      </p>
    </li>
  );
}

function LinedTitle() {
  return <div></div>;
}
