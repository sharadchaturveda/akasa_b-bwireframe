import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { generateMetadata as buildMetadata } from "@/utils/seo";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { generateSchema } from "@/utils/schema";
import { portableTextToPlainText } from "@/utils/portableTextToPlainText";
import BlogPostContent from "@/components/blog/BlogPostContent";
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

export interface Blogservice {
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

interface BlogservicePageProps {
  params: { slug: string };
}

// ----------------------------------
// Queries
// ----------------------------------

const fullserviceQuery = `*[_type == "service" && slug.current == $slug][0]{
  title,
  description,
  slug,
  publishedAt,
  _updatedAt,
  mainImage,
  body,
  author->{
    name,
    image
  },
  faqSection
}`;

const seoserviceQuery = `*[_type == "service" && slug.current == $slug][0]{
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

async function getservice<T = Blogservice>(
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
}: BlogservicePageProps): Promise<Metadata> {
  const { slug: newslug } = await params;
  const service = await getservice<Blogservice>(newslug, seoserviceQuery);
  if (!service) notFound();

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
  } = service;

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

export default async function BlogServicePage({
  params,
}: BlogservicePageProps) {
  const { slug } = await params;
  const service = await getservice<Blogservice>(slug, fullserviceQuery);
  console.log(service);

  if (!service) notFound();

  const schemaProps: any = {
    type: "Blogposting",
    title: service.title,
    description: service.description,
    url:
      service.canonicalUrl ||
      (service.slug?.current &&
        `https://akasa.sg/service/${service.slug.current}`),
    blogbody: service.body && portableTextToPlainText(service.body),
    _createdAt: service._createdAt,
    _updatedAt: service._updatedAt,
  };

  // Only include image if available
  if (service.mainImage?.asset) {
    schemaProps.image = urlFor(service.mainImage).url;
  }

  // Only include author if name is available
  if (service.author?.name) {
    schemaProps.author = {
      name: service.author.name,
      ...(service.author.image?.asset && {
        url: urlFor(service.author.image).url(),
      }),
    };
  }

  // Only include FAQs if present
  if (service.faqSection?.[0]?.faqItems?.length) {
    schemaProps.faqs = service.faqSection[0].faqItems;
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
        <BlogPostContent post={service} isService={true} />
        {/* Google Map for location */}
        <GoogleMap />
      </main>
    </>
  );
}
