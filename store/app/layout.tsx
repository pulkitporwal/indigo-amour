import Footer from "@/components/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist, Anek_Devanagari } from "next/font/google";
import Navbar from "@/components/navbar";
import Head from "next/head";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

export const urbanist = Urbanist({ subsets: ["latin"] });
export const anek = Anek_Devanagari({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "An Ethical Indian Clothing Brand in Organic Textiles - Indigo Amour",
  description: "Discover ethically crafted Indian clothing made from 100% organic textiles. Explore naturally dyed, eco-conscious fashion at Indigo Amour.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        ></link>
      </Head>
      <body className={urbanist.className}>
        <ModalProvider />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
