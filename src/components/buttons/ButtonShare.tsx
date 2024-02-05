"use client";
import { ButtonProps } from "@/types";
import { ButtonIcon, IosShareRounded } from "..";
import ShareModal from "../shareModal/ShareModal";
import { ShareProps } from "@/types/link.types";

const ButtonShare = ({
  showLabels = true,
  label,
  onClick,
  message,
  url,
}: { showLabels?: boolean } & Partial<ButtonProps> & ShareProps) => {
  return (
    <>
      <ShareModal message={message} url={url}>
        <ButtonIcon
          onClick={onClick}
          label={showLabels ? label || "share" : ""}
          icon={<IosShareRounded fontSize="small" />}
        />
      </ShareModal>
    </>
  );
};

export default ButtonShare;
