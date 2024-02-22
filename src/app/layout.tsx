import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.scss";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import { authOptions } from "@/utils/auth/auth";
import { ToastContainer } from "react-toastify";
import LightRays from "@/components/LightRays";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import Script from "next/script";

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
  title: "Devclans",
  description: "Connect with thousands of devzelopers from 100xdevs",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const googleAnalytics = process.env.NEXT_PUBLIC_GOOGLE_ADD_ID;
  return (
    <html lang="en" className={`${poppins.variable} ${bebas_neue.variable}`}>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${googleAnalytics}');`}
      </Script>
      <body>
        <ReactQueryProvider>
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
        </ReactQueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
