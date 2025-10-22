import "@/styles/globals.css";
import Header from "@/widgets/header";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/theme";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <ThemeProvider theme={theme} defaultMode="light">
        <Header />
        <main className="w-full">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>

    </>
  );
}