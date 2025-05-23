import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/utils/sanityClient'; // Ensure this path is correct

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

interface BlogPostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    mainImage?: any;
  };
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {post.mainImage && (
        <div className="relative w-full h-48">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
}
