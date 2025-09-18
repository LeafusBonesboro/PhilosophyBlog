import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function PhilosopherPage({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "philosophers", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 prose">
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      {data.excerpt && <p className="text-gray-500 text-sm mb-6">{data.excerpt}</p>}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
