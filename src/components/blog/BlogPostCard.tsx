import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/utils/sanityClient';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

interface BlogPostCardProps {
  isService? :boolean
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    mainImage?: any;
  };
}

export default function BlogPostCard({ post, isService =false }: BlogPostCardProps) {
  const imageUrl = post?.mainImage?.asset ? urlFor(post.mainImage)?.url() : null;

  return (
    <Link href={`/${isService ? 'service' : 'blog'}/${post.slug.current}`} className="group relative block h-full animate-fadeIn">
      {/* Card background with subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden flex flex-col md:flex-row h-full transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
        {imageUrl && (
          <div className="relative w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto flex-shrink-0">

            <Image
              src={urlFor(post.mainImage)?.url()}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover"
            />
          </div>
        )}

        <div className="p-6 relative flex flex-col flex-grow md:w-1/2 lg:w-3/5">
          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-2xl md:text-3xl font-playfair text-white group-hover:text-[#E6C78B] transition-colors duration-300 mb-3 leading-tight">{post.title}</h2>
          <p className="text-white/60 font-montserrat text-base mb-4">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-white/70 font-montserrat leading-relaxed text-lg flex-grow mb-6">{post.excerpt}</p>
          <span className="text-[#E6C78B] font-montserrat font-semibold hover:underline self-start">
            Read More &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
