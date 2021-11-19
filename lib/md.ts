import rehypePrism from "@mapbox/rehype-prism";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default function markdownToHtml(markdown: string) {
  return unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrism)
    .use(rehypeExternalLinks, { target: "_blank" })
    .use(rehypeStringify)
    .process(markdown)
    .then((file) => String(file));
}
