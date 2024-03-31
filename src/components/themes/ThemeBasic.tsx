import { ButtonHero, LightRays, ProjectLinks } from "@/components";
import ShootingStars from "@/components/ShootingStars";
import ProductImg from "@/components/project/ProjectImg";
import { ThemeType } from "@/types";

const ThemeBasic = ({
  avatar,
  displayName,
  username,
  projectLinks,
  links,
}: ThemeType) => {
  return (
    <>
      <div className="w100 relative fcc min-h-screen overflow-hidden">
        <LightRays imgClassName="scale" opacity={0.8} style={{}} />
        <ShootingStars />
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
              borderRadius: "20px",
            }}
          />
          <div className=" w100 fcc overflow-hidden">
            <h1
              className={` text-[36px] !text-left text-ellipsis overflow-hidden`}
            >
              {displayName || username}
            </h1>
            {username && (
              <p className="text-subH text-ellipsis overflow-hidden">
                @{username}
              </p>
            )}
          </div>
          <ProjectLinks
            className="!backdrop-blur"
            heading={"Socials"}
            links={links}
          />
          <ProjectLinks
            className="!backdrop-blur"
            links={projectLinks}
            needIconBg={false}
          />
          <ButtonHero
            href="/"
            className="fixed bottom-[5vh]"
            label="Create Your Devlink"
          />
        </div>
      </div>
    </>
  );
};

export default ThemeBasic;
