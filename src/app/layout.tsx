import type { Metadata } from "next";
import { Inter, Poppins, Bebas_Neue } from "next/font/google";
import "./globals.scss";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--poppins",
});
const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--bebas_neue",
});
export const metadata: Metadata = {
  title: "Beyond 1x",
  description: "Connect with thousands of developers from 100xdevs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${poppins.variable} ${bebas_neue.variable}`}>
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <SessionProvider session={session}>
          <main className="max-w-screen-xl border-2 border-black mx-auto">
            <Navbar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
