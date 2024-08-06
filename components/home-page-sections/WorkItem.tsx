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
  titleColor,
  gridRow,
  gridColumn,
  className = "",
  imgSrc,
  imgSrcs,
  subtitle,
  description,
  tools,
  categories,
  relatedBlogPost,
  gradient,
  borderColor,
}) {
  return (
    <li className={`${gridRow} ${gridColumn}`}>
      <Modal
        trigger={
          <button type="button" className="h-full w-full text-left ">
            <WorkItemCard {...{ title, titleColor, subtitle, className, imgSrc, gradient, borderColor }} />
          </button>
        }
      >
        <WorkItemModalContent {...{ title, imgSrc, description, subtitle, relatedBlogPost, tools, imgSrcs }} />
      </Modal>
    </li>
  );
}

function WorkItemCard({ title, imgSrc, subtitle, gradient, titleColor, borderColor }) {
  return (
    <div
      className={`h-full rd-3 bg-base1A grid overflow-clip b-t-1 b-l-1 b-r-1 sahdow-2xl bg-clip-padding ${
        borderColor ?? "b-base4A"
      } `}
      style={{
        backgroundImage: "url('/static/noise.svg')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className={`${gradient} bg-gradient-to-b  h-full grid`}
        style={{
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div className="px-3 xs:px-6 pt-3 xs:pt-5 ">
          <h3 className={`H3 ${titleColor}`}>{title}</h3>
          <p className="c-base11 text-sm">{subtitle}</p>
        </div>
        <div className="grid items-end pl-6  xs:pl-16 pt-3  ">
          <div className=" relative isolate">
            <img
              src={imgSrc}
              alt=""
              className="block min-w-0 rd-lt-3 shadow-xl object-cover absolute top-0 left-0 right-0 bottom-0 blur-15 opacity-50 -z-10"
            />

            <img src={imgSrc} alt="" className="block min-w-0 rd-lt-3 shadow-xl object-cover fade-to-b" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkItemModalContent({
  title,
  gridRow,
  gridColumn,
  imgSrc,
  description,
  subtitle,
  relatedBlogPost,
  tools,
  imgSrcs,
}) {
  return (
    <div className="">
      <h3 className="H1">{title}</h3>
      <div className="h-3"></div>
      <p className="c-base11">{subtitle}</p>
      <div className="h-6"></div>
      <p className="c-base11">{description}</p>

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

      {imgSrcs && imgSrcs.length > 0 && (
        <>
          <div className="h-6"></div>
          <ul className="flex gap-3">
            {imgSrcs.map((imgSrc, index) => {
              return <img key={`image-work-${index}`} src={imgSrc} alt="" className="w-40 h-20 min-w-0 rd-3 shadow-xl object-cover" 
              style={{
                objectPosition:'top center'
              }}
              />
            })}
          </ul>
        </>
      )}
      {tools && tools.length > 0 && (
        <>
          <div className="h-6"></div>
          <div className="b-1 b-sand4"></div>
          <div className="h-6"></div>
          <Tools tools={tools} />
        </>
      )}
      {relatedBlogPost && (
        <>
          <div className="h-6"></div>
          <div className="b-1 b-sand4"></div>
          <div className="h-6"></div>
          <RelatedBlogPost post={relatedBlogPost} />
        </>
      )}
    </div>
  );
}

function Tools({ tools }) {
  return (
    <div>
      <h4 className="H4 c-base11">Technologies Used</h4>
      <div className="h-3"></div>
      <ul className="flex gap-1.5">
        {tools.map((t, index) => {
          return <li key={`technologies-used-${index}`} className="rd-full b-1 b-base6  px-2.5 fs-xs ">{t}</li>;
        })}
      </ul>
    </div>
  );
}

function RelatedBlogPost({ post }: { post: Post }) {
  return (
    <div>
      <p className="">Learn more about this project in the blog post below.</p>
      <div className="h-6"></div>
      <article className="b-1 b-sand5 p-6 rd-3  relative isolate">
        <Space size="h-8" />
        <h5 className="H1">{post.title}</h5>
        <Space size="h-4" />
        <p className="">{post.subtitle}</p>
        <p className="c-base11 fs-sm">{post.date}</p>
        <Space size="h-8" />
        <div className="space-y-1.5em max-h-50rem overflow-hidden " dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-20rem bg-gradient-to-t from-base3 via-base2 to-transparent flex justify-center items-end p-6 ">
          <LinkButton href={`/blog/${post.id}`} className="fs-xl flex gap-2" variation="ghost">
            Read More
            <Icon name="bf-i-ph-arrow-right" />
          </LinkButton>
        </div>
      </article>
    </div>
  );
}
