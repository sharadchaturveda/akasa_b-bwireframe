import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { generateMetadata as generateSEOMetadata } from '@/utils/seo';

interface Post {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  mainImage: any;
  body: any;
  author: any;
}

interface BlogPostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    slug,
    publishedAt,
    mainImage,
    body,
    author
  }`;
  return client.fetch(query, { slug });
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImagePath: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    twitterImagePath: post.mainImage ? urlFor(post.mainImage).url() : undefined,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 pt-24 pb-12 md:px-8 lg:px-16">
      <BlogPostContent post={post} />
    </main>
  );
}
