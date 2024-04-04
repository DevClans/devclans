import { LightRays, ProjectLinks } from "@/components";
import ShootingStars from "@/components/ShootingStars";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import SocialLinks from "@/components/buttons/ButtonThemeSocialLink";
import SocialLinkButton from "@/components/buttons/ButtonThemeSocialLink";
import ProductImg from "@/components/project/ProjectImg";
import NbMovingBannerNormal from "@/components/themes/light/NbMovingBannerNormal";
import DottedLines from "@/components/themes/light/DottedLines";
import { ThemeType } from "@/types";
import { ListItemProps } from "@/types/list.types";
import "../../styles/themes/notebook.scss";
import ButtonHover from "../buttons/ButtonHover";

const ThemeLight = ({
  avatar,
  displayName,
  username,
  projectLinks,
  links,
}: ThemeType) => {
  console.log("LINKS", links);
  const socialLinks = links;
  console.log("SOCIAL_LINKS", socialLinks);

  return (
    <>
      <div className="w100 relative fcc min-h-screen overflow-hidden bg-[#F0F0F0]">
        <div className="relative w-full py-7 fcc bg-nbLGrey overflow-hidden">
          <DottedLines />
          <ProductImg
            src={avatar}
            isUser={true}
            className={`-mb-3`}
            style={{
              alignSelf: "center",
              aspectRatio: "1/1",
              objectFit: "cover",
              height: "120px",
              width: "120px",
              borderRadius: "100px",
              padding: "0",
            }}
          />
          <div className=" w100 fcc mt-3 overflow-hidden relative z-10">
            <h1
              className={` text-[36px] !text-left text-ellipsis overflow-hidden font-bold z-10`}
            >
              {displayName || username}
            </h1>
            {username && (
              <p className="text-[22px] text-ellipsis overflow-hidden">
                @{username}
              </p>
            )}
          </div>
        </div>
        <NbMovingBannerNormal
          text="My Profiles"
          rowCount={1}
          colCount={15}
          textBetween={["👨‍💻", "🚀", "🔗"]}
        />
        <div className="w100 max-w-[600px] fcc pt-10 mb-[15vh] gap-10 relative z-10">
          <div className="w-[90vw] max-w-xl">
            <SocialLinks socialLinks={socialLinks} />
          </div>
          {/* <NbMovingBannerNormal
            textBetween="👨‍💻"
            text="My Projects"
            rowCount={1}
            colCount={15}
          /> */}
          {/* <div className="w-[90vw] max-w-xl">
            <ProjectLinks
              className="!backdrop-blur"
              links={projectLinks}
              needIconBg={false}
            />
          </div> */}

          <ButtonHover isBlack={true} />
        </div>
      </div>
    </>
  );
};

export default ThemeLight;
