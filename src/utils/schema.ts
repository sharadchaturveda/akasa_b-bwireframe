// utils/schema/generateSchema.ts

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Author{
  name? :string;
  img?: string;
  url?: string
}

export interface BlogSchemaOptions {
  type?: 'WebPage' | 'BlogPosting' | 'FAQPage' | 'BreadcrumbList';
  title: string;
  description: string;
  url: string;
  image: string;
  blogbody?:string;
  datePublished?: string;
  dateModified?: string;
  author?: Author;
  breadcrumbs?: Breadcrumb[];
  faqs?: FAQ[];
  includeOrganization?: boolean;
  includeWebPage?: boolean;
  _createdAt?: string;
  _updatedAt?: string
}

export const defaultOrganization = {
  name: 'NxtDev',
  url: 'https://nxtdev.in',
  logo: 'https://github.com/godspeed-03/Stylesheets/blob/main/public/Images/OgImg.png',
  social: [
    'https://twitter.com/yourtwitter',
    'https://facebook.com/yourfacebook',
    'https://linkedin.com/in/yourlinkedin',
  ],
  telephone: '+91 96257 727443',
  contactType: 'customer service',
  areaServed: 'IN',
  availableLanguage: 'English',
  founderName: 'Satyam Anand',
  founderUrl: 'https://nxtdev.in',
  author : {
    name: 'Satyam Anand',
    url:'https://cdn.sanity.io/images/hhvs5stc/production/b886302552bd3e5a465c1d24c540e93cb91c6f31-1024x1024.png'
  }
};

export function generateSchema({
  type = 'WebPage',
  title,
  description,
  url,
  image,
  blogbody,
  author,
  breadcrumbs = [],
  faqs = [],
  includeOrganization = true,
  includeWebPage = true,
  _createdAt,
  _updatedAt
}: BlogSchemaOptions): any[] {
  const schemas: any[] = [];

  const formatted = {
    title: `${title} - ${defaultOrganization.name}`
  }

  // ✅ Organization
  if (includeOrganization) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: defaultOrganization.name,
      url: defaultOrganization.url,
      logo: {
        '@type': 'ImageObject',
        url: defaultOrganization.logo,
        width: 1200,
        height: 630,
      },
      sameAs: defaultOrganization.social,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: defaultOrganization.telephone,
        contactType: defaultOrganization.contactType,
        areaServed: defaultOrganization.areaServed,
        availableLanguage: defaultOrganization.availableLanguage,
      },
      founder: {
        '@type': 'Person',
        name: defaultOrganization.founderName,
        url: defaultOrganization.founderUrl,
      },
    });
  }

  // ✅ WebPage
  if (includeWebPage) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: formatted.title,
      url,
      description,
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630,
      },
    });
  }

  // ✅ BlogPosting (or Article)
  if (type === 'BlogPosting') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: Array.isArray(image)
        ? image.map((img) => ({
            '@type': 'ImageObject',
            url: img,
            width: 1200,
            height: 630,
          }))
        : {
            '@type': 'ImageObject',
            url: image,
            width: 1200,
            height: 630,
          },
      datePublished: _createdAt,
      dateModified: _updatedAt,
      author: Array.isArray(author)
        ? author.map((a) => ({
            '@type': 'Person',
            name: a.name,
            url: a.url,
          }))
        : {
            '@type': 'Person',
            name: author?.name || defaultOrganization.author.name,
            url: author?.url || defaultOrganization.url,
          },
      publisher: {
        '@type': 'Organization',
        name: defaultOrganization.name,
        url: defaultOrganization.url,
        logo: {
          '@type': 'ImageObject',
          url: defaultOrganization.logo,
          width: 600,
          height: 60,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      // keywords: keywords || undefined, // optional
      // genre: genre || 'Blog', // optional
      articleBody:  blogbody + '..' || undefined // optional (e.g., truncated)
    });
  }
  

  // ✅ FAQ
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'name': `${title} - FAQ`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question.trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer.trim(),
        },
      })),
    });
  }

  // ✅ BreadcrumbList
  if (breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return schemas;
}
