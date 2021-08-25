import { GetStaticProps, NextPage } from "next";
import { Footer, Header } from "../../components/Chrome";
import { PostList } from "../../components/PostList";
import { getAllPosts, Post } from "../../lib/api";

type PageProps = { posts: Post[] };

const PostsPage: NextPage<PageProps> = ({ posts }) => {
  return (
    <>
      <Header />

      <main>
        <PostList posts={posts} />
      </main>

      <Footer />
    </>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: { posts: getAllPosts() },
  };
};
