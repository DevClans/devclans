import Link from "next/link";
import { ArrowRightAltRounded } from "../mui/muiIcons";
import { ButtonProps } from "@/types";

const ButtonHero = ({
  label = "Chalo Shuru Kare",
  className,
  href,
}: Partial<ButtonProps>) => {
  return (
    <div className={`${className || "relative"}`} id="btnHeroContainer">
      <div className="hero-animation-glow"></div>
      <Link
        href={href || "/explore"}
        id="btnHero"
        className="relative text-nowrap font-medium "
      >
        {label}
        <ArrowRightAltRounded fontSize={"large"} />
        <div className="hero-preview-animation">
          <div className="hero-preview-animation-line "></div>
        </div>
      </Link>
    </div>
  );
};

export default ButtonHero;
