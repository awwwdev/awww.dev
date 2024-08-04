"use client";
import { Post } from "@/lib/api";
import Modal from "../ui/modal";
import Link from "next/link";
import Space from "../ui/Space";
import Button from "../ui/button";
import LinkButton from "../ui/button/LinkButton";
import Icon from "../ui/Icon";

export default function WorkItem({
  title,
  gridRow,
  gridColumn,
  className = "",
  imgSrc,
  subtitle,
  description,
  tools,
  categories,
  relatedBlogPost,
}) {
  return (
    <li style={{ gridRow, gridColumn }}>
      <Modal
        trigger={
          <button type="button" className="h-full w-full text-left ">
            <WorkItemCard {...{ title, subtitle, className, imgSrc }} />
          </button>
        }
      >
        <WorkItemModalContent {...{ title, imgSrc, description, subtitle, relatedBlogPost }} />
      </Modal>
    </li>
  );
}

function WorkItemCard({ title, imgSrc, subtitle }) {
  return (
    <div
      className="h-full rd-3 bg-base1A grid overflow-clip b-t-1 b-l-1 b-r-1 b-base4 sahdow-xl bg-clip-padding"
      style={{
        gridTemplateRows: "auto 1fr",
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="p-3 xs:p-6 ">
        <h3 className="H3">{title}</h3>
        <div className="h-1"></div>
        <p className="c-base11">{subtitle}</p>
      </div>
      <div className="grid items-end pl-6  xs:pl-16">
        <div className=" relative isolate">
          <img
            src={imgSrc}
            alt=""
            className="min-w-0 rd-lt-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
          />
          <img src={imgSrc} alt="" className="min-w-0 rd-lt-3 shadow-xl object-cover" />
        </div>
      </div>
    </div>
  );
}

function WorkItemModalContent({ title, gridRow, gridColumn, imgSrc, description, subtitle, relatedBlogPost }) {
  return (
    <div className="">
      <h3 className="H1">{title}</h3>
      <div className="h-3"></div>
      <p>{subtitle}</p>
      <div className="h-6"></div>
      <p>{description}</p>
      <p className="c-base11">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit commodi quidem impedit esse, voluptatum
        inventore quaerat veniam necessitatibus id, officia quos explicabo magni rerum, aliquid unde soluta cumque sit.
        Consectetur!
      </p>

      <div className="h-6"></div>

      <div className="flex justify-center">
        <div className=" relative isolate">
          <img
            src={imgSrc}
            alt=""
            className="min-w-0 rd-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
          />
          <img src={imgSrc} alt="" className="min-w-0 rd-3 shadow-xl object-cover" />
        </div>
      </div>
      {relatedBlogPost &&
      <>
      <div className="h-12"></div>
      <RelatedBlogPost post={relatedBlogPost} />
      </>
      }
    </div>
  );
}

function RelatedBlogPost({ post }: { post: Post }) {
  return (
    <div>
      <h4 className='H4'>Related Blog Post</h4>
      <div className="h-2"></div>
      <p>I wrote about this poject in this blog post.</p>
      <div className="h-6"></div>
      <article className="b-1 b-sand5 p-6 rd-3 max-h-50rem overflow-hidden relative isolate">
        <Space size="h-8" />
        <h1 className="H1">{post.title}</h1>
        <Space size="h-4" />
        <p className="">{post.subtitle}</p>
        <p className="c-base11 fs-sm">{post.date}</p>
        <Space size="h-8" />
        <div className="space-y-1.5em" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-20rem bg-gradient-to-t from-base3 via-base3 to-transparent flex justify-center items-end p-6 ">
          <LinkButton href={`/blog/${post.id}`} className="fs-xl flex gap-2" variation="ghost">
            Read More
            <Icon name="bf-i-ph-arrow-right" />
          </LinkButton>
        </div>
      </article>
    </div>
  );
}
