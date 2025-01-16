import { Post } from "@/lib/api";
import Space from "../ui/Space";
import LinkButton from "../ui/button/LinkButton";
import Icon from "../ui/Icon";
import Gallery from "../ui/Gallery";
import { StaticImageData } from "next/image";

type Category = "UI Design" | "Front End" | "Back End";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  imgs: StaticImageData[];
  relatedBlogPost?: Post;
  whatIDid: string[];
  categories?: Category[];
  linkToProject?: string;
};

export default function WorkItemModalContent({
  title,
  imgs,
  description,
  subtitle,
  relatedBlogPost,
  tools,
  whatIDid,
  categories,
  linkToProject,
}: Props) {
  return (
    <div className="">
      <h3 className="H1">{title}</h3>
      <div className="h-3"></div>
      <p className="c-base11">{subtitle}</p>
      {linkToProject && (
        <a href={linkToProject} target='_blank' rel="noreferrer" >
          Live Website
          <Icon name="bf-i-ph-arrow-up-right" className="c-base11 fs-lg" />
        </a>
      )}
      <div className="h-6"></div>
      <Gallery images={imgs.map((img) => ({ imgObject: img, src: "", alt: "" }))} />
      {tools && tools.length > 0 && (
        <>
          <div className="h-6"></div>
          <Tools tools={tools} />
          <div className="h-6"></div>
          <div className="b-1 b-base4"></div>
        </>
      )}

      <div className="h-6"></div>
      {/* <h3 className='H4 c-base11'>Description</h3> */}
      <p className="">{description}</p>
      <div className="h-6"></div>
      <h3 className="H4">What I did</h3>
      <ul>
        {whatIDid &&
          whatIDid.length > 0 &&
          whatIDid.map((i, index) => {
            return <li key={`${title}-what-I-did-${index}`}>{i}</li>;
          })}
      </ul>
      {relatedBlogPost && (
        <>
          <div className="h-6"></div>
          <p className="">Learn more about this project in the blog post below.</p>
          <div className="h-6"></div>
          <RelatedBlogPost post={relatedBlogPost} />
        </>
      )}
    </div>
  );
}

function Tools({ tools }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      <h4 className="fw-500 c-base11 mr-auto">Technologies Used</h4>
      <div className="h-3"></div>
      <ul className="flex gap-1.5 flex-wrap">
        {tools.map((t, index) => {
          return (
            <li
              key={`technologies-used-${index}`}
              className="rd-full b-1 b-base6  px-2.5 fs-xs whitespace-nowrap c-base11"
            >
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RelatedBlogPost({ post }: { post: Post }) {
  return (
    <div>
      <article className="b-1 b-base5 p-6 rd-3  relative isolate">
        <Space size="h-8" />
        <h5 className="H1">{post.title}</h5>
        <Space size="h-4" />
        <p className="">{post.subtitle}</p>
        <p className="c-base11 fs-sm">{post.date}</p>
        <Space size="h-8" />
        <div
          className="space-y-1.5em max-h-50rem overflow-hidden isolate"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-40rem bg-gradient-to-t from-base1 from-20%  to-transparent flex justify-center items-end p-6 rd-b-3 z-10">
          <LinkButton href={`/blog/${post.id}`} className="fs-xl flex gap-2" variation="outline-accent">
            Read More
            <Icon name="bf-i-ph-arrow-right" />
          </LinkButton>
        </div>
      </article>
    </div>
  );
}
