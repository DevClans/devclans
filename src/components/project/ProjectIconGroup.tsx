"use client";
import { useState } from 'react';
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";
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

} from 'next-share';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
}: {
  bookmarkCount?: number;
  likesCount?: number;
  showLabels?: boolean;
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const ShareModalContent = () => (
    <div className='flex '>
  <Box className="share-modal-content justify-center align-center ">
      <FacebookShareButton
        url={'https://github.com/next-share'}
        quote={'next-share is a social share buttons for your next React apps.'}
        hashtag={'#nextshare'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
  
      <WhatsappShareButton
        url={'https://github.com/next-share'}
        title={'Check out this link'}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      
      <TwitterShareButton
        url={'https://github.com/next-share'}
        title={'Check out this link'}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      
      <TelegramShareButton
        url={'https://github.com/next-share'}
        title={'Check out this link'}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <LinkedinShareButton
        url={'https://github.com/next-share'}
        title={'Check out this link'}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
  
      {/* Add more share options as needed */}
  
      <button onClick={handleShareButtonUnClick}>Close</button>
    </Box>
    </div>
  
  );

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  const handleShareButtonClick = () => {
    openShareModal();
  };
  const handleShareButtonUnClick = () => {
    closeShareModal();
  };

  return (
    <>
      <div className="frc gap-[10px]">
        <ButtonIcon
          label={showLabels ? "share" : ""}
          icon={<IosShareRounded fontSize="small" />}
          onClick={handleShareButtonClick}
        />
        {typeof bookmarkCount === "number" && (
          <ButtonBookmark bookmarksCount={bookmarkCount} />
        )}
        {typeof likesCount === "number" && (
          <ButtonLike likesCount={likesCount} />
        )}

        <Modal
          open={isShareModalOpen}
          onClose={closeShareModal}
          aria-labelledby="share-modal"
          aria-describedby="share-options"
        >
          <ShareModalContent />
        </Modal>
      </div>
    </>
  );
};

export default ProjectIconGroup;
