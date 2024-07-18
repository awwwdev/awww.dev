import Link from "next/link";
import { Skeleton } from "../ui/Skeleton";
import { toRelativeOrReadableDate } from "@/utils/formatter";
import Icon from "../ui/Icon";
import { DPost } from "@/types";
import Image from "next/image";
import Space from "../ui/Space";
import { getAllPosts } from "@/lib/api";
import ScrollArea from "../ui/ScrollArea";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <section className="relative">
      {/* <BluredCircle radius={100} top="20%" left="95%" bg="bg-brand-light-amber" blur="200px" /> */}
      {/* <BluredCircle radius={200} top="60%" left="5%" bg="bg-brand-light-blue" blur="200px" /> */}

      <div className="mx-auto max-w-page ">
        <div className="flex justify-between gap-4">
          <h2 className="H1">Blog</h2>
        </div>

        <div className="h-4"></div>
      </div>
      <div className="blog-section-fade-x">
        <ScrollArea>
          <ul></ul>

          <ul className=" flex gap-5 pb-8 ">
            <ScrollPadding />
            {posts.map((post) => {
              const { id, date, title } = post;
              return <BlogCard key={`blog-post-card-${id}`} title={title} date={date} slug={id} subtitle="" />;
            })}
            <ScrollPadding />
          </ul>
        </ScrollArea>
        <Space size="h-4" />
      </div>
      <div className="flex justify-end mx-auto max-w-page">
        <Link href="/blog">
          View all posts
          <Icon name="bf-i-ph-arrow-right" className="" />
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

function BlogCard({ title, subtitle, date, slug }) {
  return (
    <li className=" ">
      <Link
        className="flex flex-col b-base4 bg-gradient-to-br from-base3A to-base1A p-6 shadow-2xl rd-6 h-80  min-w-40 sm:min-w-60"
        href={`/blog/${slug}`}
      >
        <h3 className="text-base sm:text-xl font-display tracking-tight leading-tight line-clamp-1 min-h-1em">
          {title}
        </h3>
        {subtitle && <p className="c-base11">{subtitle}</p>}
        {date && <p className="c-sand11 lt-sm:text-sm">{toRelativeOrReadableDate(date)}</p>}

        <div className="mt-auto">
          <div className="flex justify-end items-baseline">
            <span className='flex items-end'>
            <Icon name="bf-i-ph-arrow-right" className="c-base8 fs-4xl leading-none " />
            </span>
          </div>
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
        minWidth: "calc((100vw - var(--max-w-page) )/2) ",
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
