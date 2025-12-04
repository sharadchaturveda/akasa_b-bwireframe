import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE_URL = "https://akasa.sg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../../public");

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "Offers", href: "/offers" },
  { name: "Loyalty Program", href: "/loyalty-program" },
  { name: "Reservations", href: "/reservations" },
  { name: "Blogs", href: "/blog" },
  { name: "Services", href: "/service" },
  { name: "A la carte Menu", href: "/menu/a-la-carte" },
  { name: "Bar bites Menu", href: "/menu/bar-bites" },
  { name: "Drinks Menu", href: "/menu/drinks" },
  { name: "Wine Pairing Menu", href: "/menu/wine-pairing" },
  { name: "Mithai", href: "/menu/mithai" },
  { name: "Saturday Brunch", href: "/menu/saturday-brunch" },
  { name: "Christmas/NY Eve", href: "/menu/christmas-ny-eve" },
  { name: "Set Lunch Menu", href: "/menu/set-lunch" },
  { name: "Soul Food Weekends Menu", href: "/menu/soul-food-weekends" },
  { name: "Tasting Menu", href: "/menu/tasting-menu" },
  { name: "Vegan Menu", href: "/menu/vegan" },
];

export async function generatePagesSitemap() {
  try {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${navItems
    .map(
      (item) => `
  <url>
    <loc>${SITE_URL}${item.href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
    <priority>${item.href === "/" ? "1.0" : "0.8"}</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

    await fs.mkdir(publicPath, { recursive: true });

    await fs.writeFile(path.join(publicPath, "sitemap-pages.xml"), sitemapContent, "utf8");

    console.log("✅ Sitemap generated successfully: sitemap-pages.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}
