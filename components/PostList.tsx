import React from "react";
import { Post } from "../lib/api";
import { Date, Title } from "./Post";

type Props = {
  posts: Post[];
};

export function PostList({ posts }: Props) {
  return (
    <section className="mt-32 space-y-20">
      <h2 id="posts" className="text-2xl uppercase opacity-50">
        Posts
      </h2>
      {posts.map((p) => (
        <Item key={p.slug} post={p} />
      ))}
    </section>
  );
}

type ItemProps = {
  post: Post;
};

function Item({ post }: ItemProps) {
  return (
    <article>
      <a
        href={`/posts/${post.slug}`}
        className="my-2 text-4xl hover:underline cursor-pointer"
      >
        <Title>{post.meta.title}</Title>
      </a>
      <Date>{post.meta.date}</Date>
      <p className="my-4">{post.meta.excerpt}</p>
    </article>
  );
}
