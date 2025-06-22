import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://akasa.sg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../../../public');

const mainUrls = ['sitemap-pages', 'sitemap-blogs', 'sitemap-services'];

export async function generateIndexSitemap() {
  try {
    const urlsXml = mainUrls
      .map(
        url => `
      <sitemap>
        <loc>${SITE_URL}/${url}.xml</loc>
       
      </sitemap>
    `
      )
      .join('');

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</sitemapindex>`;

    await fs.mkdir(publicPath, { recursive: true });

    await fs.writeFile(path.join(publicPath, 'sitemap.xml'), sitemapContent, 'utf8');

    console.log('✅ Sitemap generated successfully: sitemap.xml');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}
