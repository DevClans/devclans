import { LinkProps } from "@/types/link.types";
import LinkWithIcon from "./LinkWithIcon";
import { IconOpenInNew } from "..";
import colors from "@/lib/colors";
import { LinkWithIconProps } from "@/types";
// opens a modal to share the project
const LinkGithub = ({
  href,
  ...rest
}: LinkProps & Partial<LinkWithIconProps>) => {
  if (!href) {
    return null;
  }
  return (
    <>
      <LinkWithIcon
        {...rest}
        text="Github"
        target="_blank"
        href={"https://github.com/" + href}
        icon={<IconOpenInNew color={colors.highlight} size={14} />}
      />
    </>
  );
};

export default LinkGithub;
