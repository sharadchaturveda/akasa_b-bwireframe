import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sanityClient } from '../../utils/sanityClient'

const SITE_URL = 'https://akasa.sg/blog';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../../../public');

interface Blogs {
  slug: { current: string };
  _updatedAt: string;
}

async function fetchBlogsUrls() {

  const query = `*[_type == "post"] | order(publishedAt desc){
    slug,
    _updatedAt,
  }`
  const post: Blogs[] = await sanityClient.fetch(query)


  return post.map((ps) => ({ loc: `${SITE_URL}/${ps.slug.current}`, lastmod: ps._updatedAt }))
}

export async function generateBlogsSiteMap() {
  try {
    const products = await fetchBlogsUrls();

    const urlsXml = products
      .map(
        product => `
      <url>
        <loc>${product.loc}</loc>
        <lastmod>${product.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join('');

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urlsXml}
    </urlset>`;

    await fs.mkdir(publicPath, { recursive: true });

    await fs.writeFile(path.join(publicPath, 'sitemap-blogs.xml'), sitemapContent, 'utf8');

    console.log('✅ Sitemap generated successfully: sitemap-blogs.xml');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}
