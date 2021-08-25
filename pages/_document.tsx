import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="overflow-x-hidden">
        <Head>
          <link rel="shortcut icon" type="image/svg" href="favicon.svg" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://dietcode.io/rss.xml"
          />
        </Head>
        <body className="max-w-2xl mx-auto px-4 2xl:px-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
