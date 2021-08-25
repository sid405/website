import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import "../styles/md.css";
import "../styles/prism.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Sid's blog on digestible tech content"
        />
        <title>Dietcode.io - Sid&apos;s blog</title>

        {/* Basic */}
        <meta charSet="utf-8" />
        <meta name="title" content="Dietcode.io - Sid's blog" />
        <meta
          name="description"
          content="Sid's blog on digestible tech content"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://dietcode.io" />
        <meta property="og:title" content="Dietcode.io - Sid's blog" />
        <meta
          property="og:description"
          content="Sid's blog on digestible tech content"
        />
        <meta
          property="og:image"
          content="https://dietcode.io/opengraph.jpg?v=1"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dietcode.io" />
        <meta property="twitter:title" content="Dietcode.io - Sid's blog" />
        <meta
          property="twitter:description"
          content="Sid's blog on digestible tech content"
        />
        <meta
          property="twitter:image"
          content="https://dietcode.io/twitter.jpg?v=1"
        />
      </Head>

      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
