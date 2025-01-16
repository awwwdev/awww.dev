// lib/api.ts
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import addClasses from 'rehype-add-classes';
import rehypeVideo from 'rehype-video';
import rehypeRaw from 'rehype-raw'
 
const postsDirectory = path.join(process.cwd(), '_posts')
 
function getPostFiles() {
  return fs.readdirSync(postsDirectory)
}
 
function getParser() {
  return unified()
    .use(remarkParse , {fragment: true})
    .use(remarkRehype, { allowDangerousHtml: true})
    .use(remarkGfm)
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',

    })
    .use(rehypeStringify , {allowDangerousHtml: true})
    // .use(rehypeStringify)
    // .use(rehypeVideo)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: arg => ({
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${String(arg.properties?.id)}`,
          // style: 'margin-right: 10px',
        },
        children: [{ type: 'text', value: '' }],
      })
    })
    .use(addClasses, {
      h1: 'H1 !fs-5xl',
      h2: 'H3 !mt-[2.5em] !font-content fw-600',
      h3: 'H3',
      ul: 'list-disc list-disc-outside ',
      code: 'bg-gradient-to-r from-cyan3 to-jade3 rd-[0.25em] px-[0.25em] pt-[0.125em] c-jade10 text-[0.9em] fw-400',
      a: 'decoration-teal9   decoration-underline',
      pre: "!bg-jade1A rd-3 b-1 b-jade4"
  })
}
 
// small speedup from caching this parser
const parser = getParser()

export type Post = {
  title: string,
  subtitle:  string,
  id: string;
  date: string;
  html: string;
  draft: boolean;
  [key: string]: any;
}

export async function getPostById(id: string) {
  const realId = id.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realId}.md`)
  const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'))
 
  const html = await parser.process(content)
  const date = data.date as Date

  return {
    ...data,
    title: data.title as string,
    subtitle: data.subtitle as string,
    id: realId,
    date: `${date.toISOString().slice(0, 10)}`,
    html: html.value.toString(),
    draft: data.draft as boolean
  }
}
 
export async function getPageMarkdown(string_: string) {
  const { data, content } = matter(
    fs.readFileSync(path.join('_pages', string_), 'utf8'),
  )
  const html = await parser.process(content)
 
  return {
    ...data,
    html: html.value.toString(),
  }
}
 
export async function getAllPosts() {
  const posts = await Promise.all(getPostFiles().map(id => getPostById(id)))
  return posts.filter(p => !p.draft).sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}