import { Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/user/Navbar";
import { Toaster } from "@/components/ui/toaster";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "DoKopi",
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default async function RootLayout({ children }) {
  const session = await auth();
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  return (
    <html lang="en">
      <body className={archivo.className}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <Navbar apiKey={apiKey} />
            {children}
            <Toaster />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
