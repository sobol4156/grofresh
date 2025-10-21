import "@/styles/globals.css";
import Header from "@/widgets/header";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="light">
        <Header />
        <main className="w-full">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>

    </>
  );
}