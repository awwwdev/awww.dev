import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Skeleton } from "../ui/Skeleton";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { toRelativeOrReadableDate } from "@/utils/formatter";
import Icon from "../ui/Icon";
import { DPost } from "@/types";
import Image from "next/image";
import { En, Fa } from "../ui/multilang";
import Space from "../ui/Space";

export default function Blog() {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { locale } = useRouter();

  const blogQ = useQuery<DPost[]>({
    queryKey: ["blogQ-1"],
    queryFn: async () => {
      // const { data, error } = await supabase.from("topic").select(`category`);
      const { data, error } = await supabase.from("post").select(`*`);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative">
      {/* <BluredCircle radius={100} top="20%" left="95%" bg="bg-brand-light-amber" blur="200px" /> */}
      {/* <BluredCircle radius={200} top="60%" left="5%" bg="bg-brand-light-blue" blur="200px" /> */}

      <div className="mx-auto max-w-70rem ">
        <div className="flex justify-between gap-4">
          <h2 className="H2 c-title">
            <En>Blog</En>
            <Fa>بلاگ</Fa>
          </h2>
        </div>

        <div className="h-4"></div>
      </div>
      <div className="blog-section-fade-x">
        <ScrollArea.Root
          className="blog-section-fade-x"
          style={{
            marginLeft: "-1rem",
            marginRight: "-1rem",
          }}
          dir={locale === "en" ? "ltr" : "rtl"}
        >
          <ScrollArea.Viewport className="w-full h-full rd-2 ">
            <ul className=" flex gap-6 pb-8 ">
              <ScrollPadding />
              {blogQ.isLoading && (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              )}
              {blogQ.data && (
                <>
                  {blogQ.data.map((blogPost, index) => {
                    return <BlogCard blogPost={blogPost} key={`blog-card-${index}`} />;
                  })}
                </>
              )}
              <ScrollPadding />
            </ul>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="max-w-70rem mx-auto  flex select-none touch-none lt-sm:mx-4 p-0.5 rd-full  bg-sand4 transition-colors duration-[500ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-sand9 rd-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-11 before:min-h-11" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <Space size="h-4" />
      </div>
      <div className="flex justify-end mx-auto max-w-70rem">
        {" "}
        <Link href="/blog">
          <En>
            View all posts
            <Icon name="bf-i-ph-arrow-right" className="" />
          </En>
          <Fa>
            همه‌ پست‌ها
            <Icon name="bf-i-ph-arrow-left" className="" />
          </Fa>
        </Link>
      </div>
    </section>
  );
}

function FaderStart() {
  return (
    <div
      className="bg-gradient-to-r from-brand-light-cream via-brand-light-cream  to-transparent h-full absolute left--6 top-0 z-10"
      style={{
        minWidth: "calc((100vw - 74rem )/2) ",
      }}
    ></div>
  );
}

function FaderEnd() {
  return (
    <div
      className="bg-gradient-to-l from-brand-light-cream via-brand-light-cream to-transparent h-full absolute right--8 top-0 z-20 "
      style={{
        minWidth: "calc((100vw - 74rem )/2) ",
      }}
    ></div>
  );
}

function BlogCard({ blogPost }: { blogPost: DPost }) {
  return (
    <li className="  b-gray4 rd-4 min-w-40 sm:min-w-60  ">
      <Link className="block" href={`/blog/${blogPost.slug}`}>
        <Image
          className="block  shd-tinted-3  w-full aspect-ratio-1/1 bg-gray3 rd-2 object-cover b-1 b-white/60 "
          src={blogPost.featuredImage ?? ""}
          width={200}
          height={200}
          alt=""
        />
        <div className="h-4"></div>
        <div className="">
          <h3 className="text-base sm:text-xl fw-700 tracking-tight leading-tight c-sand11 line-clamp-1 min-h-1em">
            <En>{blogPost.title}</En>
            <Fa>{blogPost.titleFa}</Fa>
          </h3>

          {blogPost.date && <p className="c-sand11 lt-sm:text-sm">{toRelativeOrReadableDate(blogPost.date)}</p>}
        </div>
      </Link>
    </li>
  );
}

function ScrollPadding() {
  return (
    <li
      role="none"
      className=""
      style={{
        minWidth: "calc((100vw - 74rem )/2) ",
      }}
    ></li>
  );
}

function BlogCardSkeleton() {
  return (
    <>
      <li className="  b-gray4 rd-4 min-w-40 sm:min-w-60  ">
        <Skeleton className="w-full aspect-ratio-1/1 rd-2  shd-tinted-3 block  " />

        <div className="h-4"></div>
        <div className="">
          <p className="text-base sm:text-xl skeleton-text w-60% "></p>
          <p className="skeleton-text w-40% lt-sm:text-sm"></p>
        </div>
      </li>
    </>
  );
}
