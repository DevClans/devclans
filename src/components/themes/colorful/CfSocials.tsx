import { ThemeType } from "@/types";
import CfSocialLink from "./CfSocialLink";

const CfSocials = ({
  links,
  className,
  isProject,
}: {
  links: ThemeType["links"];
  className?: string;
  isProject?: boolean;
}) => {
  return (
    <div
      style={{
        background: `${
          isProject
            ? "var(--circle, url('/patterns/circle.png'))"
            : "var(--stars, url('/patterns/star.png'))"
        } ${
          isProject ? "var(--cf-orange-light)" : "var(--cf-cyan)"
        } 0% 0% / 10px 10px repeat`,
      }}
      className={" w-full h-full p-5 gap-3 flex flex-col " + className}
    >
      {links.map((link, index) => (
        <CfSocialLink
          isProject={isProject}
          key={index}
          index={index}
          link={link}
        />
      ))}
    </div>
  );
};

export default CfSocials;
