import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const baseUrl = "https://philosophy-blog.vercel.app";

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    return `
      <url>
        <loc>${baseUrl}/blog/${file.replace(/\.md$/, "")}</loc>
        <lastmod>${data.date || new Date().toISOString()}</lastmod>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${posts.join("\n")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
