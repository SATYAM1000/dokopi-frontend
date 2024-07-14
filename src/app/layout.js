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
import BannerForActiveOrders from "@/components/user/global/Banner";
import NextTopLoader from "nextjs-toploader";
import DoKopiUserPhone from "@/components/user/auth/DoKopiUserPhone";


export default async function RootLayout({ children }) {
  const session = await auth();
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  return (
    <html lang="en">
      <body className={archivo.className}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ReduxProvider>
              <BannerForActiveOrders />
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
