import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.scss";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import { authOptions } from "@/utils/auth";
import { ToastContainer } from "react-toastify";
import LightRays from "@/components/LightRays";

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
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`${poppins.variable} ${bebas_neue.variable}`}>
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider session={session}>
          {modal}
          <Header />
          <LightRays />
          {children}
        </SessionProvider>
        <ToastContainer
          theme="dark"
          toastStyle={{
            border: "1px solid var(--border, #132341)",
            background: "var(--cardBg, #081121)",
            borderRadius: 10,
            boxShadow:
              "0px 4px 5.3px 0px rgba(20, 26, 37, 0.20) inset, 0px -4px 3px 0px rgba(6, 12, 24, 0.10) inset, 0px 10px 20px 0px rgba(1, 8, 22, 0.80)",
          }}
          toastClassName={"card"}
        />
      </body>
    </html>
  );
}
