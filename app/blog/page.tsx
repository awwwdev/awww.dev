// app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import Space from "@/components/ui/Space";
import BluredCircle from "@/components/home-page-sections/BluredCircle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Hamid K. Blog",
  metadataBase: new URL("https://awww.dev"),
  openGraph: {
    title: "Blog | Hamid K.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-page relative">
      <BluredCircle radius={200} top="20%" left="85%" bg="bg-iris2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-cyan2" blur="200px" />
      <h1 className="H1">Blog</h1>
      <Space size="h-8" />
      <ul className="">
        {posts.map((post) => {
          const { id, date, title, subtitle } = post;
          return (
            <li key={id} className="b-b-1 b-base5 py-6 last:b-none last:b-none">
              <Link href={`/blog/${id}`} className="block ">
                <h2 className="H4">{title}</h2>
                <p className="c-base11">{subtitle}</p>
                <p className="c-base11">{date}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
