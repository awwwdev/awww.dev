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
        <Space size="h-40 md:h-50" />
        <Works posts={posts} />
        <Space size="h-40 md:h-50" />
        <Experiences />
        <Space size="h-40 md:h-50" />
        <Tools />
        <Space size="h-40 md:h-50" />
        <Blog posts={posts}/>
        <Space size="h-40 md:h-50" />
        <AboutMe />
        <Space size="h-40 md:h-50" />
        <ContactMe />
    </div>
  );
};

