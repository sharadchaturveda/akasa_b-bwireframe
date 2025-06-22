import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://akasa.sg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../../../public');

const mainUrls = ['sitemap', 'sitemap-pages', 'sitemap-product'];

export async function generateRobotsTxt() {
  try {
    const urlsXml = mainUrls.map(url => `Sitemap: ${SITE_URL}/${url}.xml`).join('\n');

    const robotsContent = `# *
User-agent: *
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
${urlsXml}
`;
    await fs.mkdir(publicPath, { recursive: true });

    await fs.writeFile(path.join(publicPath, 'robots.txt'), robotsContent, 'utf8');

    console.log('✅ robots.txt generated successfully.');
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error);
  }
}
