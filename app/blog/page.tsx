// app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import Space from '@/components/ui/Space';

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-page">
      <h1 className="H1">Blog</h1>
      <Space size='h-8' />
      <ul className=''>
        {posts.map((post) => {
          const { id, date, title } = post;
          return (
            <li key={id} className='b-b-1 b-base5 py-6 last:b-none last:b-none'>
              <Link href={`/blog/${id}`} className='block '>
                <h2 className="H4">{title}</h2>
                <p>Subtitle</p>
                <p className="c-base11">{date}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}