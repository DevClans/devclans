import LinkWithIcon from "./LinkWithIcon";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
// opens a modal to share the project
const LinkShare = () => {
  return (
    <>
      <LinkWithIcon
        text="Share"
        href="/"
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
