import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import supabase from "@/utils/supabase";
import { DPost } from "@/types";
import Space from "@/components/ui/Space";
import { getFullName, toReadableDate } from "@/utils/formatter";
import { En, Fa } from "@/components/ui/multilang";
import Button from '@/components/ui/button';
import Icon from '@/components/ui/Icon';

export async function getServerSideProps(context) {
  const { locale } = context;
  const { data, error } = await supabase.from("post").select(`* , user(*)`);

  if (error) {
    console.error("Fetch posts data error: ", error);
    return { props: {} };
  }

  let posts = data;
  if (locale === "fa") {
    posts = posts.filter((post) => post.contentFa !== null);
  } else if (locale === "en") {
    posts = posts.filter((post) => post.content !== null);
  }
  return {
    props: {
      posts,
    },
  };
}

const Blog = ({ posts }: { posts: DPost[] }) => {
  return (
    <div>
      <div className="max-w-page mx-auto">
        <h1 className="H1">
          <En>Blog</En>
          <Fa>بلاگ</Fa>
        </h1>
        <Space size="h-16" />
        <ul className="grid gap-6 sm:gap-12 ">
          {posts.map((post) => (
            <BlogPostCard post={post} key={`blog-post-card-${post.id}`} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;

function BlogPostCard({ post }: { post: DPost }) {
  const { locale } = useRouter();

  return (
    <li>
      <Link href={`/blog/${post.slug}`} key={post.id}>
        <div className="sm:flex items-stretch  ">
          <div className="shrink-0">
            <Image
              src={post.featuredImage ?? ""}
              alt={`${locale === "fa" ? post.titleFa : post.title}`}
              width={300}
              height={300}
              className={`rd-4  block bg-sand4 min-h-60 md:min-h-80 aspect-1/1 w-full md:w-80 object-cover italic  text-center flex items-center c-sand10 shd-tinted-3 `}
            />
          </div>

          <div className=" px-0 py-4 w-full  ">
            <div className={`pis-6 p-6 flex flex-col ${locale === "fa" ? "sm:rd-r-4 " : "sm:rd-r-4" } h-full sm:b-1 b-sand5 `}>

            <h2 className="H4 sm:H3 md:H2 c-melow line-clamp-4">{locale === "fa" ? post.titleFa : post.title}</h2>
            <Space size="h-4" />
            <div>{locale === "fa" ? post.subtitleFa : post.subtitle}</div>
            <p>{getFullName(post.user)}</p>
            <p>{toReadableDate(post.date ?? "")}</p>
            <div className='flex justify-end w-full mt-auto'>
              <Button variation='ghost' className='text-xl py-1em lt-sm:display-none' >
                <En>
                Read More

                <Icon name='bf-i-ph-arrow-right' className='mis-2'/>
                </En>
                <Fa>
                ادامه مطلب
                <Icon name='bf-i-ph-arrow-left' className='mis-2' />

                </Fa>
              </Button>
            </div>
          </div>
          </div>

          </div>

      </Link>
    </li>
  );
}
