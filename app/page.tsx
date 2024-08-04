import Hero from "@/components/home-page-sections/Hero";
import Blog from "@/components/home-page-sections/Blog";
import Space from "@/components/ui/Space";
import ContactMe from '@/components/home-page-sections/ContactMe';
import Tools from '@/components/home-page-sections/Tools';
import AboutMe from '@/components/home-page-sections/AboutMe';
import { getAllPosts } from '@/lib/api';
import Experiences from '@/components/home-page-sections/Experiences';
import Works from '@/components/home-page-sections/Works';



export default async function Page() {
  const posts = await getAllPosts()
  return (
    <div className="">
        <Hero />
        <Space size="h-40 sm:h-50" />
        <Works />
        <Space size="h-40 sm:h-50" />
        <Experiences />
        <Space size="h-40 sm:h-40" />
        <Tools />
        {/* <Process /> */}
        <Space size="h-40 sm:h-40" />
        <Blog posts={posts}/>
        <Space size="h-40 sm:h-40" />
        <AboutMe />
        <Space size="h-40 sm:h-40" />
        <ContactMe />
    </div>
  );
};

