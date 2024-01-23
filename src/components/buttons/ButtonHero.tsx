import Link from "next/link";
import { ArrowRightAltRounded } from "../mui/muiIcons";

const ButtonHero = () => {
  return (
    <div className="relative" id="btnHeroContainer">
      <div className="hero-animation-glow"></div>
      <Link href="/explore" id="btnHero" className="relative">
        Chalo shuru kare
        <ArrowRightAltRounded fontSize={"large"} />
        <div className="hero-preview-animation">
          <div className="hero-preview-animation-line "></div>
        </div>
      </Link>
    </div>
  );
};

export default ButtonHero;
