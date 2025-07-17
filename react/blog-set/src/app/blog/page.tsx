import { BlogList } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas e estratégias para impulsioanr seu negócio',
  robots: 'index, follow',
  openGraph: {
    title: 'Blog',
    description: 'Dicas e estratégias para impulsionar seu negócio',
    // url: '' // must have production control,
    siteName: 'Site.Set',
    locale: 'pt_BR',
    type: 'website',
    images: [{
      url: '', // must have production control,
      width: 800,
      height: 600,
      alt: 'Blog'
    }]
  }
}

export default async function BlogListPage() {
  const sortedPosts = allPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1000);
  })

  return (
    <BlogList posts={sortedPosts} />
  )
}