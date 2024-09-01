import Link from "next/link";
import { toRelativeOrReadableDate } from "@/utils/formatter";
import Icon from "../ui/Icon";
import Space from "../ui/Space";
import ScrollArea from "../ui/ScrollArea";
import BluredCircle from "./BluredCircle";
import GradientBorderOverlay from "../ui/GradientBorderOverlay";

export default function Blog({ posts }) {
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
      </div>
      <div className="blog-section-fade-x ">
        <ScrollArea>
          <ul className=" flex pb-8 pt-4  ">
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


function BlogCard({ title, subtitle, date, slug, gap }) {
  return (
    <li className={`${gap}`}>
      <Link
        className={`relative flex flex-col b-base4 bg-gradient-to-br from-base3A to-base1A p-6 shadow-2xl rd-6 h-70 xs:h-80 w-60  xs:w-70 b-0 b-transparent
          hover:from-sage4A
          `}
        href={`/blog/${slug}`}
      >
        <GradientBorderOverlay to="to-transparent" via="via-slate1A" direction="135deg" />
        <GradientBorderOverlay from="from-transparent" via="via-slate1A" direction="135deg" />
        <h3 className="text-base sm:text-xl font-display sm:tracking-tight leading-tight  min-h-1em">{title}</h3>
        <Space size="h-1" />
        {subtitle && <p className="c-base11">{subtitle}</p>}

        <div className="mt-auto">
          <div className="flex justify-between items-baseline">
            {date && <p className="c-base11 lt-sm:text-sm">{toRelativeOrReadableDate(date)}</p>}
            <span className="flex items-end">
              <Icon name="bf-i-ph-arrow-right" className="c-base8 fs-2xl leading-none " />
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
      // role="none"
      className=""
      style={{
        minWidth: "calc((100vw - var(--max-w-page) )/2) ",
      }}
    ></li>
  );
}

