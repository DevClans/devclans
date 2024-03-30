// import { Analytics } from "@vercel/analytics/react";
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
import { urlBase } from "@/constants";
import { URL } from "url";

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
const description =
  "Discover & Connect with thousands of devs. Explore projects, find mentors, and team up with potential co-founders, all within the 100xdevs cohort.";
const title = "Devclans";
const img = {
  url: urlBase + "/metaImg.png",
  width: 1200,
  height: 630,
  alt: "Visit us at https://www.devclans.com | Devclans",
};
export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | Devclans`,
  },
  metadataBase: new URL(urlBase),
  description,
  openGraph: {
    title: {
      template: `%s | Devclans`,
      default: title,
    },
    type: "website",
    locale: "en_IE",
    url: urlBase,
    images: [img],
  },
  twitter: {
    site: "@devclans",
    title: {
      template: `%s | Devclans`,
      default: title,
    },
    card: "summary_large_image",
    description,
    creator: "@devclans",
    images: [img],
  },
};
// 321626
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
  const googleAnalytics = process.env.GOOGLE_ADD_ID;
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
        {/* <Analytics /> */}
        <SpeedInsights />
      </body>
    </html>
  );
}
