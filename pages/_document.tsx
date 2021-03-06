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
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Dietcode.io - Sid's blog"
            href="https://dietcode.io/rss.xml"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="icon" type="image/png" href="/favicon.png" />
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
