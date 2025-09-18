import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function ConceptsIndex() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  // collect unique concepts from frontmatter
  const concepts = new Set();
  files.forEach((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (data.concepts) {
      data.concepts.forEach((concept) => concepts.add(concept));
    }
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Concepts</h1>
      <ul className="space-y-2">
        {[...concepts].map((concept) => (
          <li key={concept}>
            <Link
              href={`/concepts/${concept}`}
              className="text-orange-500 hover:underline"
            >
              {concept}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
