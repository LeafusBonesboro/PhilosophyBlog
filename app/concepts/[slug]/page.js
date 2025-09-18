import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default async function ConceptPage({ params }) {
  const { concept } = await params;

  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      if (data.concepts?.includes(concept)) {
        return {
          slug: filename.replace(/\.md$/, ""),
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Concept: {concept}</h1>
      {posts.length === 0 ? (
        <p>No posts yet for this concept.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-500 text-sm">{post.date}</p>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
