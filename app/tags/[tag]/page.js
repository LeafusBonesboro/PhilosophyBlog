import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default async function TagPage({ params }) {
  const { tag } = await params; // ✅ await params

  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const posts = files
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(fileContent);
      return {
        slug: file.replace(/\.md$/, ""),
        ...data,
      };
    })
    .filter((post) => post.tags && post.tags.includes(tag));

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Posts tagged: #{tag}</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl text-orange-500 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">
              {typeof post.date === "string"
                ? post.date
                : new Date(post.date).toISOString().split("T")[0]}
            </p>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
