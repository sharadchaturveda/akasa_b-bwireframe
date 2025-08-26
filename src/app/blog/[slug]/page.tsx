import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import BlogPostContent from "@/components/blog/BlogPostContent";
import { generateMetadata as buildMetadata } from "@/utils/seo";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { generateSchema } from "@/utils/schema";
import { portableTextToPlainText } from "@/utils/portableTextToPlainText";
import GoogleMap from "@/components/ui/GoogleMap";

// ----------------------------------
// Interfaces
// ----------------------------------

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Author {
  name: string;
  image: SanityImageSource;
  url: string;
}

export interface FAQ {
  faqTitle: string;
  faqItems: {
    _key?: string;
    question: string;
    answer: string;
  }[];
}

export interface BlogPost {
  title: string;
  description: string;
  slug: { current: string };
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;
  mainImage: SanityImageAsset;
  body: any;
  author: Author;
  faqSection?: FAQ[];
  canonicalUrl?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImgUrl?: string;
  ogType?: "article" | "website";
}

interface BlogPostPageProps {
  params: { slug: string };
}

// ----------------------------------
// Queries
// ----------------------------------

const fullPostQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  slug,
  publishedAt,
  _updatedAt,
  _createdAt,
  mainImage,
  body,
  author->{
    name,
    image
  },
  faqSection
}`;

const seoPostQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  slug,
  canonicalUrl,
  metaRobots,
  ogTitle,
  ogDescription,
  ogImgUrl,
  ogType,
  mainImage
}`;

// ----------------------------------
// Fetch Helper
// ----------------------------------

async function getPost<T = BlogPost>(
  slug: string,
  query: string
): Promise<T | null> {
  return client.fetch(query, { slug });
}

// ----------------------------------
// Metadata Generator
// ----------------------------------

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug: newslug } = await params;
  const post = await getPost<BlogPost>(newslug, seoPostQuery);
  if (!post) notFound();

  const {
    title,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogType,
    ogImgUrl,
    metaRobots,
    slug,
    mainImage,
  } = post;

  const ogImageUrl =
    ogImgUrl || (mainImage?.asset ? urlFor(mainImage).url() : undefined);

  return buildMetadata({
    title: ogTitle || title,
    description: ogDescription || description,
    url: canonicalUrl || (slug?.current ? `/blog/${slug.current}` : ""),
    ogImageUrl,
    type: ogType || "article",
    metaRobots: metaRobots || "INDEX, FOLLOW",
  });
}

// ----------------------------------
// Page Component
// ----------------------------------

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost<BlogPost>(slug, fullPostQuery);

  if (!post) notFound();

  const schemaProps: any = {
    type: "BlogPosting",
    title: post.title,
    description: post.description,
    url:
      post.canonicalUrl ||
      (post.slug?.current && `https://akasa.sg/blog/${post.slug.current}`),
    blogbody: post.body && portableTextToPlainText(post.body),
    _createdAt: post._createdAt,
    _updatedAt: post._updatedAt,
  };

  // Only include image if available
  if (post.mainImage?.asset) {
    schemaProps.image = urlFor(post.mainImage).url();
  }

  // Only include author if name is available
  if (post.author?.name) {
    schemaProps.author = {
      name: post.author.name,
      ...(post.author.image?.asset && {
        url: urlFor(post.author.image).url(),
      }),
    };
  }

  // Only include FAQs if present
  if (post.faqSection?.[0]?.faqItems?.length) {
    schemaProps.faqs = post.faqSection[0].faqItems;
  }

  const schemaData = generateSchema(schemaProps);

  return (
    <>
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="container mx-auto px-4 pt-24 pb-12 md:px-8 lg:px-16">
        <BlogPostContent post={post} />

        {/* Google Map for location */}
        <GoogleMap />
      </main>
    </>
  );
}
