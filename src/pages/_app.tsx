import { ModalProvider } from "@/context/ModalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <ModalProvider>
        <Head>
          <title>AlgoRaidar</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Web application that contain leetcode problems"
            />
        </Head>
        <Component {...pageProps} />
    </ModalProvider>
    </>
  );
}
