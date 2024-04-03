import { LightRays, ProjectLinks } from "@/components";
import ShootingStars from "@/components/ShootingStars";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import SocialLinks from "@/components/buttons/ButtonThemeSocialLink";
import SocialLinkButton from "@/components/buttons/ButtonThemeSocialLink";
import ProductImg from "@/components/project/ProjectImg";
import CfMovingBannerNormal from "@/components/themes/light/CfMovingBannerNormal";
import DottedLines from "@/components/themes/light/DottedLines";
import { ThemeType } from "@/types";
import { ListItemProps } from "@/types/list.types";

const ThemeLight = ({
  avatar,
  displayName,
  username,
  projectLinks,
  links,
}: ThemeType) => {
    console.log("LINKS", links)
    const socialLinks = links
    .flatMap((link) => {
      if (typeof link === "object" && "href" in link) {
        return link.href;
      } else {
        return [];
      }
    })
    .filter((href): href is string => href !== undefined);
    console.log("SOCIAL_LINKS", socialLinks)

  return (
    <>
      <div className="w100 relative fcc min-h-screen overflow-hidden bg-[#F4F4F4]">
        <DottedLines />
        <div className="max-w-[600px] w100 fcc p-3 mt-6 mb-[15vh] gap-6">
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
              padding: "0"
            }}
          />
          <div className=" w100 fcc overflow-hidden">
            <h1
              className={` h1Highlight text-[36px] !text-left text-ellipsis overflow-hidden font-bold z-10`}
            >
              {displayName || username}
            </h1>
            {"username" && (
              <p className="text-subH text-ellipsis overflow-hidden">
                @{username}
              </p>
            )}
          </div>
          <CfMovingBannerNormal text="Project Links" rowCount={1} colCount={15} />

          <div className="w-[90vw] max-w-xl"><SocialLinks socialLinks={socialLinks} /></div>

          <ProjectLinks
            className="!backdrop-blur"
            links={projectLinks}
            needIconBg={false}
          />
          <ButtonNormal />
        </div>
      </div>
    </>
  );
};

export default ThemeLight;
