import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/utils/seo';
import { Metadata } from 'next';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value.asset) {
        return null;
      }
      return (
        <div className="relative w-full h-64 md:h-96 my-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Post Image'}
            layout="fill"
            objectFit="cover"
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
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-[#E6C78B] hover:underline transition-colors duration-200">
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const query = `*[_type == "post"]{"slug": slug.current}`;
  const posts = await client.fetch(query);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export const revalidate = 60; // Cache page for 60 seconds (ISR)

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    mainImage
  }`;
  const post = await client.fetch(query, { slug });

  if (!post) {
    return {
      title: 'Post not found',
      description: 'This blog post could not be found.',
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.description || '',
    ogImagePath: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    author
  }`;
  const post = await client.fetch(query, { slug });

  if (!post) notFound();
  
  return (
    <main className="container mx-auto px-4 pt-24 pb-12 md:px-8 lg:px-16">
      <article className="max-w-4xl mx-auto bg-neutral-900 p-6 md:p-10 rounded-lg shadow-xl border border-neutral-800 animate-fadeSlideUp">
        {post.mainImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4 leading-tight">{post.title}</h1>
        <p className="text-white/60 font-montserrat text-base md:text-lg mb-6">
          Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <hr className="border-neutral-700 mb-8" />
        <div className="prose prose-invert max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
        {/* Back to Blog Button - Placed at the bottom */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center px-6 py-3 text-white bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors duration-200 shadow-md text-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
