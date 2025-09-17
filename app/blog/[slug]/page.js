import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Generate static paths for each post
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params; // ✅ ensure params is awaited
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 prose">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      {formattedDate && (
        <p className="text-gray-500 text-sm mb-6">{formattedDate}</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
