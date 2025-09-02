import type { Metadata } from "next";

export interface MetadataOptions {
  title?: string;
  description?: string;
  url?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  type?: "website" | "article";
  metaRobots?: string;
  keywords?: string;
  authors?: { name: string; url?: string }[];
}

export function generateMetadata({
  title,
  description,
  url,
  ogTitle,
  ogDescription,
  ogImageUrl,
  type = "website",
  metaRobots = "index, follow",
  keywords = "Indian cuisine, Singapore restaurant, fine dining, Akasa, Indian food, Robinson Road, authentic Indian, luxury dining",
  authors = [
    { name: "Akasa", url: "https://akasa.sg" }, // example second author
  ],
}: MetadataOptions): Metadata {
  // Default metadata fallbacks
  const fallback = {
    title: "Akasa | Finest Indian Cuisine in Singapore",
    description:
      "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30am.",
    url: "https://akasa.sg",
    image: "https://akasa.sg/images/seo/og-image.jpg",
    twitterImage: "https://akasa.sg/images/seo/twitter-card.jpg",
  };

  const formattedTitle = title ? title : fallback.title;
  const formattedOGTitle = ogTitle ? `${ogTitle} - Akasa` : fallback.title;
  const formattedDescription = description ?? fallback.description;
  const formattedOGDescription = ogDescription ?? fallback.description;
  const finalUrl = url?.startsWith("https") ? url : `${fallback.url}/${url}`;
  const finalImage = ogImageUrl?.startsWith("https")
    ? ogImageUrl
    : fallback.image;

  // Robots directive handling
  const robotsObject = {
    index: /INDEX/i.test(metaRobots),
    follow: /FOLLOW/i.test(metaRobots),
    nocache: /NO-CACHE/i.test(metaRobots),
    noarchive: /NOARCHIVE/i.test(metaRobots),
    notranslate: /NOTRANSLATE/i.test(metaRobots),
    nosnippet: /NOSNIPPET/i.test(metaRobots),
    noimageindex: /NOIMAGEINDEX/i.test(metaRobots),
  };
  const extraDirectives = metaRobots
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.includes(":"))
    .join(", ");
  const robotsMetaString = [
    ...Object.entries(robotsObject)
      .filter(([, value]) => value)
      .map(([key]) => key.toLowerCase()),
    ...(extraDirectives ? [extraDirectives] : []),
  ].join(", ");

  return {
    title: formattedTitle,
    description: formattedDescription,
    alternates: { canonical: finalUrl },
    robots: robotsMetaString,
    keywords: keywords,
    authors: authors,

    openGraph: {
      title: formattedOGTitle,
      description: formattedOGDescription,
      url: finalUrl,
      siteName: "Akasa",
      locale: "en_SG",
      type,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
        {
          url: "https://akasa.sg/images/home/hero/carousel/hero1.jpg",
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: formattedOGTitle,
      description: formattedOGDescription,
      images: [
        ogImageUrl ?? fallback.twitterImage,
        "https://akasa.sg/images/home/hero/carousel/hero1.jpg",
      ],
      creator: "@akasa_singapore",
      site: "@akasa_singapore",
    },
  };
}
