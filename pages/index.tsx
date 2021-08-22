import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Icon } from "../components/Icon";
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
      <header className="flex items-center justify-between my-16">
        <div className="flex items-center">
          <Link href="https://github.com/madebysid">
            <a title="Visit my GitHub profile">
              <Icon name="github" />
            </a>
          </Link>
          <Link href="mailto:me@madebysid.com">
            <a title="Email me" className="mx-8">
              <Icon name="mail" />
            </a>
          </Link>
        </div>
        <ThemeSwitch />
      </header>

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
