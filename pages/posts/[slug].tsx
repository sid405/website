import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { Icon } from "../../components/Icon";
import { Date, Tags, Title } from "../../components/Post";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";
import markdownToHtml from "../../lib/md";

type PageProps = {
  meta: Post["meta"];
  content: string;
};

const ThemeSwitch = dynamic(() => import("../../components/ThemeSwitch"));

const PostPage: NextPage<PageProps> = ({ meta, content }) => {
  return (
    <>
      <header className="flex items-center justify-between my-16">
        <Link href="/#posts">
          <a
            title="Back to home page"
            className="flex items-center space-x-2 underline cursor-pointer"
          >
            <Icon name="arrow-left" size={12} />
            <span>dietcode.io</span>
          </a>
        </Link>
        <ThemeSwitch />
      </header>

      <main className="flex flex-col">
        <section>
          <Title>{meta.title}</Title>
          <Tags value={meta.tags} />
          <Date>{meta.date}</Date>
          <article
            className="markdown"
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
