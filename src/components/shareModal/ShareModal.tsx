"use client";
import { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "next-share";
import Modal from "@mui/material/Modal";
import ButtonClose from "../buttons/ButtonClose";
import ButtonLinkIcon from "../buttons/ButtonLinkIcon";
import ButtonShare from "../buttons/ButtonShare";
import { ShareProps } from "@/types/link.types";
import { Box } from "@mui/material";

const ShareModal = ({
  children,
  url,
  message,
}: ShareProps & React.PropsWithChildren) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const shareUrl = url || "https://github.com/next-shareasdfasdfa";
  const shareMsg =
    message || "next-share is a social share buttons for your next React apps.";
  const ShareModalContent = () => {
    return (
      <div className="w100 h-full fccc">
        <div className="relative card gap-4 rounded-[20px] p-4 fcc share-modal-content justify-center align-center max-w-[300px]">
          <h2 className="text-center">Share To Your Network</h2>
          <div className="frc w100">
            <input
              disabled
              value={shareUrl}
              type="text"
              className="!border-r-0 max-h-[42px] w100 !rounded-[5px] text-nowrap"
            />
            <ButtonLinkIcon text={shareUrl} />
          </div>
          <div className="frcsb w100 gap-2">
            <FacebookShareButton
              url={shareUrl}
              quote={shareMsg}
              // hashtag={"#nextshare"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={shareMsg}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl} title={shareMsg}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} title={shareMsg}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <LinkedinShareButton url={shareUrl} title={shareMsg}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
          {/* Add more share options as needed */}
          <ButtonClose onClick={closeShareModal} />
        </div>
      </div>
    );
  };

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  const handleShareButtonClick = () => {
    openShareModal();
  };

  return (
    <>
      <div className="frc gap-[10px]">
        <div onClick={handleShareButtonClick}>
          {children || <ButtonShare url={url} message={message} />}
        </div>
        <Modal
          open={isShareModalOpen}
          onClose={closeShareModal}
          aria-labelledby="share-modal"
          aria-describedby="share-options"
        >
          <Box>
            <ShareModalContent />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ShareModal;
