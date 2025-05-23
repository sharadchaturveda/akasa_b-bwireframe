import { sanityClient } from '@/utils/sanityClient'
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogHeroSection from '@/components/blog/BlogHeroSection'; // Import the new hero component

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
    <>
      <BlogHeroSection /> {/* Use the new hero component */}
      <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16"> {/* Re-added container and padding to main */}
        <section className="grid gap-12 grid-cols-1 mt-12"> {/* This section will now be within the container */}
          {posts.map((post: any) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </section>
      </main>
    </>
  )
}
