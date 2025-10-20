import Header from "@/widgets/header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (<Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="antialiased mt-[30px]">
      <Header />
      <Main />
      <NextScript />
    </body>
  </Html>
  );
}
