import Hero from "@/components/home-page-sections/Hero";
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

