import { sanityClient } from '@/utils/sanityClient'
import BlogPostCard from '@/components/blog/BlogPostCard';
import styles from '@/styles/blog.module.css'             // your blog-specific styles or use tailwind

export const revalidate = 60  // cache page for 60 seconds (ISR)

export default async function BlogPage() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }`
  const posts = await sanityClient.fetch(query)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </section>
    </main>
  )
}
