import "@/app/styles/globals.css";
import Header from "@/widgets/header";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/theme";
import Head from "next/head";
import { StoreProvider } from "@/app/providers/store-provider";
import { AddToCartModal } from "@/features/add-to-cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <StoreProvider>
        <ThemeProvider theme={theme} defaultMode="light">
          <Header />
          <main className="w-full">
            <Component {...pageProps} />
          </main>
          <AddToCartModal />

        </ThemeProvider>
      </StoreProvider>
    </>
  );
}