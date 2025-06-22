import { generateIndexSitemap } from './sitemaps/main';
import { generatePagesSitemap } from './sitemaps/pages';
import { generateBlogsSiteMap } from './sitemaps/blogs';
import { generateServicesSiteMap } from './sitemaps/service';
import { generateRobotsTxt } from './sitemaps/robots';

export async function generateAllSitemaps() {
    await generateIndexSitemap();
    await generatePagesSitemap();
    await generateBlogsSiteMap();
    await generateServicesSiteMap();

    await generateRobotsTxt();
}

