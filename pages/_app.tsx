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
        <title>Diet Code</title>
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
