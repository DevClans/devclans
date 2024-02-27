import Hero from "@/components/home/Hero";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";

const title = "Devclans | Find Developers, Mentors, and Co-founders";
export const metadata: Metadata = generateCommonMetadata({
  title,
  titleAbsolute: true,
});

export default function Home() {
  return (
    <>
      <div className="mt-20" />
      <Hero />
      {/* <LightRays /> */}
    </>
  );
}
