import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


export default function Document() {

  return (<Html lang="en" data-scroll-behavior="smooth">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet"
      />
      <Script src="https://telegram.org/js/telegram-web-app.js" />
    </Head>
    <body className="antialiased pt-[30px] w-full">
      <Main />
      <NextScript />
    </body>
  </Html>
  );
}