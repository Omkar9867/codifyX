import { ModalProvider } from "@/context/ModalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModalProvider>
        <Head>
          <title>CodifyX</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Web application that contain leetcode problems"
          />
        </Head>
        <ToastContainer />
        <Component {...pageProps} />
      </ModalProvider>
    </>
  );
}
