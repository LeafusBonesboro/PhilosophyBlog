// lib/generateSitemap.js
import fs from "fs";
import path from "path";

export default function generateSitemap() {
  const baseUrl = "https://philosophy-blog.vercel.app";
  const postsDirectory = path.join(process.cwd(), "posts");

  const postFiles = fs.readdirSync(postsDirectory);

  // Generate <url> entries for each markdown post
  const urls = postFiles.map((file) => {
    const slug = file.replace(/\.md$/, "");
    return `
      <url>
        <loc>${baseUrl}/blog/${slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
  });

  // Add homepage + static pages
  const staticPages = [
    "",
    "about",
    "contact",
    "blog"
  ].map((page) => {
    return `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
  });

  // Final sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.join("\n")}
    ${urls.join("\n")}
  </urlset>`;

  // Write to /public so it's accessible at /sitemap.xml
  fs.writeFileSync("public/sitemap.xml", sitemap);
}
