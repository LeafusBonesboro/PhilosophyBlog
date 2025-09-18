import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function TagsIndex() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  // Collect all tags across posts
  let allTags = [];
  files.forEach((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (data.tags && Array.isArray(data.tags)) {
      allTags = [...allTags, ...data.tags];
    }
  });

  // Deduplicate tags
  const uniqueTags = [...new Set(allTags)].sort();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Browse by Tags</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {uniqueTags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="block px-4 py-2 rounded bg-gray-100 hover:bg-orange-200 text-gray-800"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
