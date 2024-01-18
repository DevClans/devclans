import { LinkProps } from "@/types/link.types";
import LinkWithIcon from "./LinkWithIcon";
import { IconOpenInNew } from "..";
import colors from "@/lib/colors";
// opens a modal to share the project
const LinkGithub = ({ href }: LinkProps) => {
  return (
    <>
      <LinkWithIcon
        text="Github"
        href={"https://github.com" + href || "/"}
        icon={<IconOpenInNew color={colors.highlight} size={14} />}
      />
    </>
  );
};

export default LinkGithub;
