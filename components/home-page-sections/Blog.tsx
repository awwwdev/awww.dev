import Link from "next/link";
import { Skeleton } from "../ui/Skeleton";
import { toRelativeOrReadableDate } from "@/utils/formatter";
import Icon from "../ui/Icon";
import Space from "../ui/Space";
import ScrollArea from "../ui/ScrollArea";
import BluredCircle from "./BluredCircle";

export default function Blog({posts}) {

  return (
    <section className="relative ">
      <BluredCircle radius={200} top="20%" left="85%" bg="bg-iris2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-cyan2" blur="200px" />

      <div className="mx-auto max-w-page ">
        <div className="flex justify-between gap-6 items-baseline">
          <h2 className="H1" id="blog">
            Blog
          </h2>
          <Link href="/blog" className="c-base11">
            View all posts
            <Icon name="bf-i-ph-arrow-right" className="mis-1" />
          </Link>
        </div>
        <Space size="h-4" />
      </div>
      <div className="blog-section-fade-x ">
        <ScrollArea>
          <ul></ul>

          <ul className=" flex pb-8   ">
            <ScrollPadding />
            {posts.map((post, index) => {
              const { id, date, title } = post;
              return (
                <BlogCard
                  key={`blog-post-card-${id}`}
                  title={title}
                  date={date}
                  slug={id}
                  subtitle={post.subtitle}
                  gap={index !== 0 && "ml-5 "}
                />
              );
            })}
            <ScrollPadding />
          </ul>
        </ScrollArea>
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

function BlogCard({ title, subtitle, date, slug, gap }) {
  console.log("🚀 ~ date:", date)
  return (
    <li className={`${gap}`}>
      <Link
        className={`flex flex-col b-base4 bg-gradient-to-br from-base3A to-base1A p-6 shadow-2xl rd-6 h-70 xs:h-80 w-60  xs:w-70 
          hover:from-sage4A
          `}
        href={`/blog/${slug}`}
      >
        <h3 className="text-base sm:text-xl font-display sm:tracking-tight leading-tight  min-h-1em">{title}</h3>
        <Space size="h-1" />
        {subtitle && <p className="c-base11">{subtitle}</p>}

        <div className="mt-auto">
          <div className="flex justify-between items-baseline">
            {date && <p className="c-sand11 lt-sm:text-sm">{toRelativeOrReadableDate(date)}</p>}
            <span className="flex items-end">
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
