import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Hero from "@/components/home-page-sections/Hero";
import Features from "@/components/home-page-sections/Features";
import Categoreis from "@/components/home-page-sections/Categories";
import Stats from "@/components/home-page-sections/Stats";
import Process from "@/components/home-page-sections/Process";
import Testomonials from "@/components/home-page-sections/Testomonials";
import FAQ from "@/components/home-page-sections/FAQ";
import Blog from "@/components/home-page-sections/Blog";
import Space from "@/components/ui/Space";
import ContactMe from '@/components/home-page-sections/ContactMe';
import Works from '@/components/home-page-sections/Works';
import Tools from '@/components/home-page-sections/Tools';
import AboutMe from '@/components/home-page-sections/AboutMe';

export async function getServerSideProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "home", "header", "footer"])),
    },
  };
}

const Page: NextPage = () => {
  return (
    <div className="">
      <div className="p-4">
        <Hero />
        {/* <Features /> */}
        {/* <Stats /> */}
        <Space size="h-20" />
        {/* <Categoreis /> */}
        <Works />

        <Space size="h-20" />
        <Tools />
        {/* <Process /> */}
        <Space size="h-20" />
      </div>
      {/* <Testomonials />  */}
      <div className="p-4">
        <Space size="h-30" />
        {/* <FAQ /> */}
        <Blog />
        <Space size="h-30" />
        <AboutMe />
        <Space size="h-30" />
        <ContactMe />
      </div>
    </div>
  );
};

export default Page;
