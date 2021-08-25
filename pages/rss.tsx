import * as fs from "fs";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/api";

type PageProps = {};

export default function Rss() {
  return null;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts();
  const rss = `<rss version="2.0">
    <channel>
      <title>Dietcode.io</title>
      <link>https://dietcode.io</link>
      <description>Digestible tech content</description>
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
              <author>Siddhant</author>
              <pubDate>${p.meta.date}</pubDate>
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
