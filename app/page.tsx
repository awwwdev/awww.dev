import Hero from "@/components/home-page-sections/Hero";
// import Features from "@/components/home-page-sections/Features";
// import Categoreis from "@/components/home-page-sections/Categories";
// import Stats from "@/components/home-page-sections/Stats";
// import Process from "@/components/home-page-sections/Process";
// import Testomonials from "@/components/home-page-sections/Testomonials";
// import FAQ from "@/components/home-page-sections/FAQ";
import Blog from "@/components/home-page-sections/Blog";
import Space from "@/components/ui/Space";
import ContactMe from '@/components/home-page-sections/ContactMe';
import Works from '@/components/home-page-sections/Works';
import Tools from '@/components/home-page-sections/Tools';
import AboutMe from '@/components/home-page-sections/AboutMe';
import { getAllPosts } from '@/lib/api';



export default async function Page() {
  const posts = await getAllPosts()

  return (
    <div className="">
        <Hero />
        <Space size="h-40 sm:h-50" />
        <Works />
        <Space size="h-40 sm:h-40" />
        <Tools />
        {/* <Process /> */}
        <Space size="h-40 sm:h-40" />
        <Blog />
        <Space size="h-40 sm:h-40" />
        <AboutMe />
        <Space size="h-40 sm:h-40" />
        <ContactMe />
    </div>
  );
};

