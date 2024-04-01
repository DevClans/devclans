import { ThemeType } from "@/types";
import CfHero from "./colorful/CfHero";
import { Abril_Fatface } from "next/font/google";
import "../../styles/themes/colorful.scss";
import CfMovingBanner from "./colorful/CfMovingBanner";
import CfSocials from "./colorful/CfSocials";
import ButtonHover from "../buttons/ButtonHover";
import Link from "next/link";

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--abril",
});
const ThemeColorful = ({
  links,
  avatar,
  displayName,
  username,
  projectLinks,
}: ThemeType) => {
  const haveProjects = Array.isArray(projectLinks) && projectLinks.length > 0;
  return (
    <div className={`${abril.variable} w100 min-h-screen`}>
      <CfHero avatar={avatar} displayName={displayName} username={username} />
      <CfMovingBanner text="My Socials" rowCount={1} colCount={15} />
      <CfSocials links={links} className={haveProjects ? "" : "min-h-[60vh]"} />
      {haveProjects && (
        <>
          <CfMovingBanner text="My Projects" rowCount={1} colCount={15} />
          <CfSocials
            isProject={true}
            links={projectLinks}
            className="min-h-[60vh]"
          />
        </>
      )}
      <ButtonHover />
      {/* attribution */}
      <div className="px-4 py-3 w-full text-center lg:text-left">
        <p className="max-w-[800px]">
          Thanks to Subaash for letting us use his awesome design.{" "}
          <Link
            className=" text-white inline-block underline underline-offset-1"
            href={"https://subaash.vercel.app/"}
          >
            Click here
          </Link>{" "}
          to visit his website.
        </p>
      </div>
    </div>
  );
};

export default ThemeColorful;
