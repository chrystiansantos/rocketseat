import { BlogList } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";

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