import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/user/global/Navbar";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/redux/redux-provider";
const archivo = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "DoKopi",
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";
import dynamic from "next/dynamic";
import Head from "next/head";

const DoKopiUserPhone = dynamic(() =>
  import("@/components/user/auth/DoKopiUserPhone")
);

export default async function RootLayout({ children }) {
  const session = await auth();
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.dokopi.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://d28fpa5kkce5uk.cloudfront.net" />
      </head>
      <body className={archivo.className}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ReduxProvider>
              <Navbar apiKey={apiKey} />
              {session?.user && session?.user?.phone === null ? (
                <DoKopiUserPhone />
              ) : (
                children
              )}

              <Toaster richColors />
            </ReduxProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
