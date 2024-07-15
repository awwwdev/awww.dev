import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const isRtl = this.props.locale === "fa";
    return (
      <Html lang={this.props.locale} dir={isRtl ? "rtl" : "ltr"} className="dark-theme">
        <Head>
          <meta charSet="utf-8" />
          {/* <meta name="theme-color" content="#000000" /> */}
          <meta name="robots" content="max-snippet:20, max-image-preview:large" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;900&family=Vazirmatn:wght@400;500;600;700;900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className={`dark-theme bg-sand1 c-sand12 `}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
