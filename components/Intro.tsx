import { default as NextLink } from "next/link";
import React from "react";
import { Icon } from "./Icon";
import { Link } from "./Link";
import { TopoBackground } from "./TopoBackground";

type Props = {
  latestPostSlug: string;
  latestPostTitle: string;
};

export function Intro({ latestPostTitle, latestPostSlug }: Props) {
  return (
    <section
      className="flex flex-col items-center"
      style={{
        height: "calc(100vh - 13rem)",
      }}
    >
      <TopoBackground />
      <article className="space-y-8">
        <p className="text-5xl">👋</p>
        <p>I&apos;m Sid, I&apos;m a Typescript Engineer in Berlin.</p>
        <p>
          I currently work at Prisma, and we’re trying to bring databases to
          2021. I work on a{" "}
          <Link
            href="https://cloud.prisma.io"
            title="Visit the Prisma Data Platform"
          >
            cloud platform
          </Link>
          , a{" "}
          <Link
            href="https://github.com/prisma/text-editors"
            title="Visit Github repository for Prisma's text editor"
          >
            text editor
          </Link>
          , a{" "}
          <Link
            href="https://github.com/prisma/studio"
            title="Visit GitHub repository for Prisma Studio"
          >
            database UI
          </Link>{" "}
          & a{" "}
          <Link
            href="https://github.com/prisma/lens"
            title="Visit GitHub repository for Prisma Lens"
          >
            design system
          </Link>
          .
        </p>
        <p>
          I also like to dabble in Rust & Graphics programming outside of work,
          and I’m currently working on{" "}
          <Link
            href="https://github.com/crimsontools/crisp"
            title="Visit GitHub repository for Crisp"
          >
            Crimson
          </Link>
          , which is a GPU-accelerated path renderer.
        </p>
        <p>
          You’ve landed on a log of my experiments. Check out my latest post:{" "}
          <Link
            href={`/posts/${latestPostSlug}`}
            title="Read my latest blog post"
          >
            {latestPostTitle}
          </Link>
        </p>
        <p>
          P.S. This page’s background is generated on-the-fly!{" "}
          <Link
            href="/posts/webgl-topographic"
            title="Read how this page's background is generated"
          >
            Here’s how
          </Link>
          .
        </p>
      </article>

      <div className="flex-grow flex-shrink-0"></div>

      <div className="flex m-4">
        <NextLink href="#posts">
          <a title="Go to posts">
            <Icon name="arrow-down" />
          </a>
        </NextLink>
      </div>
    </section>
  );
}
