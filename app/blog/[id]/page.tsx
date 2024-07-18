import Space from '@/components/ui/Space'
import { getPostById, getAllPosts } from '@/lib/api'
 
// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({
  params: { id },
}: {
  params: { id: string }
}) {
  const { html, title, date } = await getPostById(id)
  return (
    <article className='mx-auto max-w-page'>
      <Space size='h-8' />
      <h1 className='H1'>{title}</h1>
      <p className='c-base11 fs-sm'>{date}</p>
      <Space size='h-8' />
      <div 
      className='space-y-1em'
      dangerouslySetInnerHTML={{ __html: html }} />
    </article>
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
  const { title } = await getPostById(id)
  return {
    title,
  }
}