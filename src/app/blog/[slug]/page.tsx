import { generateMetadata as generateSEOMetadata } from '@/utils/seo';
import { Metadata } from 'next';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {};
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 pt-24 pb-12 md:px-8 lg:px-16">
      <BlogPostContent slug={slug} />
    </main>
  );
}
