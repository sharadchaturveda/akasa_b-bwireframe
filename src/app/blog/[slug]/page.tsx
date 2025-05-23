import { sanityClient } from '@/utils/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const builder = imageUrlBuilder(sanityClient);

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
        <div className="relative w-full h-96 my-4">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Post Image'}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-medium my-2">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed my-2">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 my-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    em: ({ children }: any) => <em className="text-gray-600 font-semibold">{children}</em>,
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const query = `*[_type == "post"]{"slug": slug.current}`;
  const posts = await sanityClient.fetch(query);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export const revalidate = 60; // Cache page for 60 seconds (ISR)

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    body,
    author->{name, image}
  }`;
  const post = await sanityClient.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        {post.mainImage && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <h1 className="text-5xl font-extrabold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-6">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </main>
  );
}
