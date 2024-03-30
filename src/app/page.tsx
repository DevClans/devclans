import { Header, LightRays } from "@/components";
import Hero from "@/components/home/Hero";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";

const title = "Devclans | Find Devs, Projects, & Cofounders";
export const metadata: Metadata = generateCommonMetadata({
  title,
  titleAbsolute: true,
});

export default function Home() {
  return (
    <>
      <Header />
      <LightRays opacity={0.5} />
      <div className="mt-20" />
      <Hero />
      {/* <LightRays /> */}
    </>
  );
}
