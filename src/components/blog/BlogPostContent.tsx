"use client";

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { BlogFAQ } from './BlogFAQ';
import { BlogPost } from '@/app/blog/[slug]/page';

// export interface Post {
//   title: string;
//   description: string;
//   slug: string;
//   publishedAt: string;
//   mainImage: any;
//   body: any;
//   author: any;
//   faqSection?: {
//     faqTitle: string;
//     faqItems: {
//       _key?: string;
//       question: string;
//       answer: string;
//     }[];
//   }[];
// }

interface BlogPostContentProps {
  isService?: boolean;
  post: BlogPost;
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value.asset) return null;
      return (
        <div className="relative w-full h-64 md:h-96 my-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Post Image'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-playfair text-white mt-8 mb-4 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-playfair text-white mt-6 mb-3 leading-snug">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-playfair text-white mt-5 mb-2 leading-normal">{children}</h3>,
    normal: ({ children }: any) => <p className="text-base md:text-lg font-montserrat text-white/70 leading-relaxed my-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#E6C78B] pl-4 italic my-6 text-white/70 font-montserrat text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4 text-white/70 font-montserrat text-base md:text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4 text-white/70 font-montserrat text-base md:text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="mb-2 leading-relaxed">{children}</li>,
  },
  marks: {
    em: ({ children }: any) => <em className="text-white/70 font-montserrat font-semibold">{children}</em>,
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          // target={target}
          // rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-[#E6C78B] hover:underline transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogPostContent({ post, isService=false }: BlogPostContentProps) {
  const imageUrl = post?.mainImage?.asset ? urlFor(post.mainImage)?.url() : null;
  const authorImageUrl = post?.author?.image?.asset ? urlFor(post.mainImage)?.url() : null;
  return (
    <article className="max-w-8xl mx-auto bg-neutral-900 p-6 md:p-10 rounded-lg shadow-xl border border-neutral-800 animate-fadeSlideUp">
      {imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4 leading-tight">{post.title}</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-6 mb-6 text-white/60 font-montserrat">
        {post.author && (
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {authorImageUrl && <Image
              src={urlFor(post.author.image).width(64).height(64).url()}
              alt={post.author.name}
              width={64}
              height={64}
              className="rounded-full border border-white/10"
            />}
            <div className="text-white/80">
              <p className="text-base md:text-lg">{post.author.name}</p>
              <p className="text-sm text-white/50">Author</p>
            </div>
          </div>
        )}
        <p className="text-base md:text-lg">
          Updated at{" "}
          {new Date(post._updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>


      </div>



      <hr className="border-neutral-700 mb-8" />

      <div className="prose prose-invert max-w-none">
        <PortableText value={post.body} components={components} />
      </div>

      {post.faqSection && <BlogFAQ faqSections={post.faqSection} />}

      {/* Back to Blog Button */}
      <div className="mt-8 text-center">
        <Link
          href={`/${isService?'service' : 'blog'}`}
          className="inline-flex items-center px-6 py-3 text-white bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors duration-200 shadow-md text-lg font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {!isService? 'Blog' : 'Service'}
        </Link>
      </div>
    </article>
  );
}
