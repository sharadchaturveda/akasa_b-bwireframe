import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loyalty Program | Akasa - Exclusive Member Benefits",
  description: "Join Akasa's exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats. Earn points with every visit and unlock exclusive member perks.",
  keywords: "loyalty program, member benefits, exclusive discounts, Akasa rewards, dining rewards, Singapore restaurant loyalty",
  authors: [{ name: "Akasa" }],

  // Open Graph metadata
  openGraph: {
    title: "Loyalty Program | Akasa - Exclusive Member Benefits",
    description: "Join Akasa's exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats. Earn points with every visit and unlock exclusive member perks.",
    url: "https://akasa.sg/loyalty-program",
    siteName: "Akasa",
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "https://akasa.sg/images/offers/loyalty_program/loyalty.jpg",
        width: 1200,
        height: 630,
        alt: "Akasa Loyalty Program - Exclusive Member Benefits",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Loyalty Program | Akasa - Exclusive Member Benefits",
    description: "Join Akasa's exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats. Earn points with every visit and unlock exclusive member perks.",
    images: [
      "https://akasa.sg/images/offers/loyalty_program/loyalty.jpg",
    ],
    creator: "@akasa_singapore",
    site: "@akasa_singapore",
  },

  // Canonical URL
  alternates: {
    canonical: "https://akasa.sg/loyalty-program",
  },
}; 