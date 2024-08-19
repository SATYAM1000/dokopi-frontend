// Next.js and React imports
import { Noto_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Global styles
import "./globals.css";

// Components
import Navbar from "@/components/user/global/Navbar";
import DoKopiUserPhone from "@/components/user/auth/DoKopiUserPhone";
import HeadContent from "@/components/common/HeadContent";

// Providers
import ReduxProvider from "@/providers/redux/redux-provider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

// Utilities
import { auth } from "@/auth";
import { Toaster } from "sonner";

// Load fonts
const noto = Noto_Sans({ subsets: ["latin"] });

// Metadata
export const metadata = {
  metadataBase: new URL("https://www.dokopi.com"),
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
    "dokopy",
    "docopy",
    "Xerox Store",
    "Xerox Printer",
    "Xerox Driver",
    "Xerox Driver",
    "Xerox Printer",
    "Xerox Printer",
    "Xerox Printer",
  ],
  title: {
    default: "Dokopi",
    template: "%s | Dokopi",
  },
  openGraph: {
    type: "website",
    url: "https://dokopi.com",
    siteName: "Dokopi",
    images: [""],
    description:
      "Find and connect with the nearest Xerox store based on your location with our platform. Easily upload documents, make secure payments, and get your prints ready in minutes. Simplifying your printing needs with fast, location-based service.",
  },
  description:
    "Find and connect with the nearest Xerox store based on your location with our platform. Easily upload documents, make secure payments, and get your prints ready in minutes. Simplifying your printing needs with fast, location-based service.",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <HeadContent />
      <body className={`${noto.className}`}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ReduxProvider>
              <Navbar />
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
