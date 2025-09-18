import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function PhilosophersIndex() {
  const philosophersDirectory = path.join(process.cwd(), "philosophers");
  const files = fs.readdirSync(philosophersDirectory);

  const philosophers = files.map((filename) => {
    const filePath = path.join(philosophersDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      name: data.name,
      excerpt: data.excerpt,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Philosophers</h1>
      <ul className="space-y-4">
        {philosophers.map((philosopher) => (
          <li key={philosopher.slug}>
            <Link href={`/philosophers/${philosopher.slug}`} className="text-xl font-semibold hover:text-orange-500">
              {philosopher.name}
            </Link>
            {philosopher.excerpt && <p className="text-sm text-gray-600">{philosopher.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
