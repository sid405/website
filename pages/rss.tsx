import * as fs from "fs";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/api";

type PageProps = {};

export default function Rss() {
  return null;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts();
  const rss = `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Dietcode.io</title>
      <link>https://dietcode.io</link>
      <atom:link href="https://dietcode.io/rss.xml" rel="self" type="application/rss+xml" />
      <description>Sid's blog on digestible tech content</description>
      <language>en</language>
      <lastBuildDate>${new Date(
        posts[0].meta.date
      ).toUTCString()}</lastBuildDate>
      ${posts
        .map(
          (p) =>
            `<item>
              <guid>https://dietcode.io/posts/${p.slug}</guid>
              <link>https://dietcode.io/posts/${p.slug}</link>
              <title>${p.meta.title}</title>
              <description>${p.meta.excerpt}</description>
              <pubDate>${new Date(p.meta.date).toUTCString()}</pubDate>
            </item>`
        )
        .join("\n")}
    </channel>
  </rss>`;

  fs.writeFileSync("./public/rss.xml", rss, "utf8");

  return {
    props: {},
  };
};
