import fs from "fs";
import gm from "gray-matter";
import path from "path";

export type Post = {
  slug: string;
  content: string;
  meta: {
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    draft?: boolean;
  };
};

const postsDirectory = path.join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = gm(fileContents);

  return {
    slug: realSlug,
    content,
    meta: data as Post["meta"],
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.meta.draft)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1)); // sort by desc date
  return posts;
}
