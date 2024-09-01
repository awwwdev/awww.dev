import Icon from '@/components/ui/Icon'
import Space from '@/components/ui/Space'
import { getPostById, getAllPosts } from '@/lib/api'
import Link from 'next/link'
 
// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({
  params: { id },
}: {
  params: { id: string }
}) {
  const { html, title, date , subtitle } = await getPostById(id)
  return (
    <div className='mx-auto max-w-page'> 
      <Link href='/blog' className='flex  gap-2 c-base11'>
        <Icon name="bf-i-ph-arrow-left"  />
        Blog
      </Link>
    <article className=''>
      <Space size='h-8' />
      <h1 className='H1 !fs-6xl !ls-tighter !leading-18 bg-gradient-to-r from-jade12 to-cyan11 c-transparent bg-clip-text opacity-95'>{title}</h1>
      <p className=''>{subtitle}</p>
      <p className='c-base11 fs-sm'>{date}</p>
      <Space size='h-24' />
      <div 
      className='article-spacing article-content'
      dangerouslySetInnerHTML={{ __html: html }} />
    </article>
      </div>
  )
}
 
// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
  const posts = await getAllPosts()
 
  return posts.map(post => ({
    id: post.id,
  }))
}
 
// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title, subtitle } = await getPostById(id)
  return {
    title: `${title}, ${subtitle} | Hamid K. Blog`,
    description: 'A Blog Post by Hamid K. Blog',
    alternates: {
      canonical: `/blog/${id}`,
  }
  };
}