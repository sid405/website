import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Icon } from "../../components/Icon";
import { ThemeSwitch } from "../../components/ThemeSwitch";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";
import markdownToHtml from "../../lib/md";
import markdownStyles from "../../styles/markdown.module.css";

type PageProps = {
  meta: Post["meta"];
  content: string;
};

const PostPage: NextPage<PageProps> = ({ meta, content }) => {
  return (
    <>
      <header className="flex items-center justify-between my-16">
        <Link href="/#posts">
          <a
            title="Back to home page"
            className="flex items-center space-x-4 underline cursor-pointer"
          >
            <Icon name="arrow-left" size={14} />
            <span className="ml-1">dietcode.io</span>
          </a>
        </Link>
        <ThemeSwitch />
      </header>

      <main className="flex flex-col">
        <section>
          <h3 className="my-2 text-4xl">{meta.title}</h3>
          <ul className="flex space-x-4">
            {meta.tags.map((t) => (
              <li key={t} className="text-gray-400 dark:gray-300">
                #{t}
              </li>
            ))}
          </ul>
          <h6 className="mt-2 mb-16 text-xl text-red-500">{meta.date}</h6>
          <article
            className={markdownStyles["markdown"]}
            dangerouslySetInnerHTML={{ __html: content }}
          ></article>
        </section>
      </main>
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      meta: post.meta,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPosts().map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
