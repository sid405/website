import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "../lib/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Diet Code</title>
      </Head>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
export default MyApp;
