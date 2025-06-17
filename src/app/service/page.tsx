import { sanityClient } from '@/utils/sanityClient'
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogHeroSection from '@/components/blog/BlogHeroSection'; // Import the new hero component

export const revalidate = 60  // cache page for 60 seconds (ISR)

export default async function BlogPage() {
  const query = `*[_type == "service"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }`
  const service = await sanityClient.fetch(query)

  return (
    <>
      <BlogHeroSection bannerSrc='/images/blog/hero/hero.jpg' title='Our Services' desc='Explore our services, culinary insights, and stories from Akasa' /> {/* Use the new hero component */}
      <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16"> {/* Re-added container and padding to main */}
        <section className="grid gap-12 grid-cols-1 mt-12"> {/* This section will now be within the container */}
          {service.map((post: any) => (
            <BlogPostCard key={post._id} post={post} isService={true} />
          ))}
        </section>
      </main>
    </>
  )
}
