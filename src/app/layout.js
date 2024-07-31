import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/user/global/Navbar";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/redux/redux-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
const archivo = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://dokopi.com"),
  keywords: [
    "print",
    "xerox",
    "dokopi",
    "dokopi.com",
    "dokopi.id",
    "print.id",
    "Dokopi",
    "Print",
    "Xerox",
  ],
  title: {
    default: "Dokopi",
    template: "%s | Dokopi",
  },
  openGraph: {
    type: "website",
    url: "https://dokopi.com/",
    siteName: "Dokopi",
    images: [""],
    description: "Print with ease. Anywhere. Anytime.",
  },
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NextTopLoader from "nextjs-toploader";

import DoKopiUserPhone from "@/components/user/auth/DoKopiUserPhone";
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
        <link
          rel="dns-prefetch"
          href="https://accounts.google.com/o/oauth2/v2/auth"
        />

        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://api.dokopi.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://d28fpa5kkce5uk.cloudfront.net" />
        <link
          rel="preconnect"
          href="https://accounts.google.com/o/oauth2/v2/auth"
        />
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

              <Toaster richColors duration={1500} />
            </ReduxProvider>
          </ReactQueryProvider>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
