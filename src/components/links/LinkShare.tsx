import { LinkProps } from "@/types/link.types";
import LinkWithIcon from "./LinkWithIcon";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
// opens a modal to share the project
const LinkShare = ({ href }: LinkProps) => {
  return (
    <>
      <LinkWithIcon
        text="Share"
        href={href || "/"}
        isBold={true}
        icon={
          <IosShareOutlinedIcon
            style={{
              height: 14,
              width: 14,
            }}
          />
        }
      />
    </>
  );
};

export default LinkShare;
