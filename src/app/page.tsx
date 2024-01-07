import Image from "next/image";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <div className="mt-20" />
      <Hero />
      {/* LIGHT RAYS */}
      <div
        style={{
          zIndex: -1,
        }}
      >
        <Image priority src={"/homeHeroBg.png"} alt="home background" fill />
      </div>
    </>
  );
}
