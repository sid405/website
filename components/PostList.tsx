import React from "react"
import { Post } from "../lib/api"

type Props = {
  posts: Post[]
}

export function PostList({ posts }: Props) {
  return (
    <section className="mt-16">
      <h2 id="posts" className="text-2xl uppercase opacity-50">
        Posts
      </h2>
      {posts.map((p) => (
        <Item key={p.slug} post={p} />
      ))}
    </section>
  )
}

type ItemProps = {
  post: Post
}

function Item({ post }: ItemProps) {
  return (
    <article className="my-16">
      <a
        href={`/posts/${post.slug}`}
        className="my-2 text-4xl hover:underline cursor-pointer"
      >
        {post.meta.title}
      </a>
      <h6 className="my-2 text-xl text-red-500">{post.meta.date}</h6>
      <p className="my-8">{post.meta.excerpt}</p>
    </article>
  )
}
