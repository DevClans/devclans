import ButtonHero from "../buttons/ButtonHero";
import { memo } from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="container relative fcc">
      <div className="fcc gap-y-[60px]">
        <div className="fcc gap-y-6">
          <h1>
            find Cohort study <span className="h1Highlight">Buddy</span>
          </h1>
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Connect with thousands of developer bhais from 100xdevs cohort
          </p>
        </div>
        <ButtonHero />
      </div>
      <HomeHeroPlanet />
      <HomeHeroDash />
    </div>
  );
};

export default memo(Hero);

function BottomGradient() {
  return (
    <div
      className="w-full h-[208px] z-10 absolute bottom-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 7, 21, 0.10) 0%, #000715 100%)",
      }}
    ></div>
  );
}

function HomeHeroPlanet() {
  return (
    <Image
      src="/homeHero.png"
      alt="home hero planet"
      width={626}
      height={626}
      className="relative"
      style={{
        zIndex: -1,
        marginTop: -125,
        mixBlendMode: "lighten",
      }}
      priority
    />
  );
}

const HomeHeroDash = () => {
  return (
    <div className="relative">
      <Image
        style={{}}
        src="/homeHeroDash.png"
        alt="home hero dash"
        width={1130}
        height={480}
        priority
      />
      <BottomGradient />
    </div>
  );
};
