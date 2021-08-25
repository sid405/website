import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Footer } from "../../components/Chrome";
import { Icon } from "../../components/Icon";
import { Date, Tags, Title } from "../../components/Post";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";
import markdownToHtml from "../../lib/md";

type PageProps = {
  meta: Post["meta"];
  slug: Post["slug"];
  content: string;
};

const ThemeSwitch = dynamic(() => import("../../components/ThemeSwitch"));

const PostPage: NextPage<PageProps> = ({ meta, slug, content }) => {
  return (
    <>
      <Head>
        <title>{meta.title} - Dietcode.io</title>

        {/* Basic */}
        <meta charSet="utf-8" />
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.excerpt} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={`https://dietcode.io/posts/${slug}`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.excerpt} />
        <meta
          property="og:image"
          content="https://dietcode.io/opengraph.jpg?v=1"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://dietcode.io/posts/${slug}`}
        />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.excerpt} />
        <meta
          property="twitter:image"
          content="https://dietcode.io/twitter.jpg?v=1"
        />
      </Head>

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
            className="markdown mt-16"
            dangerouslySetInnerHTML={{ __html: content }}
          ></article>
        </section>
      </main>

      <Footer />
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
      slug,
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
