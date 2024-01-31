import { LinkProps, ShareProps } from "@/types/link.types";
import LinkWithIcon from "./LinkWithIcon";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ShareModal from "../shareModal/ShareModal";
// opens a modal to share the project
type LinkShareProps = Partial<LinkProps> & ShareProps;
const LinkShare = ({ href, icon, ...shareProps }: LinkShareProps) => {
  return (
    <>
      <ShareModal {...shareProps}>
        <LinkWithIcon
          text="Share"
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
      </ShareModal>
    </>
  );
};

export default LinkShare;
