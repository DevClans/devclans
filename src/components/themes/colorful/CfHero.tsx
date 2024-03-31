import { ThemeType } from "@/types";
import CfBgCircle from "./CfBgCircle";
import CfImage from "./CfImage";
import CfMovingBanner from "./CfMovingBanner";
import HeroWhitePattern from "./HeroWhitePattern";

const CfHero = ({
  avatar,
  username,
  displayName,
}: {
  avatar: ThemeType["avatar"];
  username: string;
  displayName: string;
}) => {
  return (
    <div
      id="cfHero"
      className="relative max-h-[200px] lg:max-h-fit colorChange"
    >
      <HeroWhitePattern className="grid items-end pb-5 lg:pb-10 ">
        <CfMovingBanner
          className={"mb-1"}
          type={0}
          colCount={10}
          text={username || displayName}
        />
        <CfBgCircle className="justify-self-center " />
        <CfImage
          className="flex-shrink-0 h-[100px] lg:h-[205px] w-[108px] lg:w-[225px]"
          src={avatar}
          alt="home background"
          width={108}
          height={98}
          username={username}
          displayName={displayName}
        />
      </HeroWhitePattern>
    </div>
  );
};

export default CfHero;
