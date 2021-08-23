import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Intro } from "../components/Intro";
import { PostList } from "../components/PostList";
import { getAllPosts, Post } from "../lib/api";

type PageProps = {
  posts: Post[];
};

const ThemeSwitch = dynamic(() => import("../components/ThemeSwitch"));

const Home: NextPage<PageProps> = ({ posts }) => {
  return (
    <>
      <Header />

      <main className="flex flex-col">
        <Intro
          latestPostTitle={posts[0].meta.title}
          latestPostSlug={posts[0].slug}
        />
        <PostList posts={posts} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: { posts: getAllPosts().slice(0, 4) },
  };
};
