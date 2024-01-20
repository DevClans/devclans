"use client";
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";

const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
}: {
  bookmarkCount: number;
  likesCount: number;
  showLabels?: boolean;
}) => {
  return (
    <>
      <div className="frc gap-[10px]">
        <ButtonIcon
          label={showLabels ? "share" : ""}
          icon={<IosShareRounded fontSize="small" />}
        />
        <ButtonBookmark bookmarksCount={bookmarkCount} />
        <ButtonLike likesCount={likesCount} />
      </div>
    </>
  );
};

export default ProjectIconGroup;
