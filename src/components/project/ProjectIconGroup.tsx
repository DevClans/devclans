"use client";
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";

const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
}: {
  bookmarkCount?: number;
  likesCount?: number;
  showLabels?: boolean;
}) => {
  return (
    <>
      <div className="frc gap-[10px]">
        <ButtonIcon
          label={showLabels ? "share" : ""}
          icon={<IosShareRounded fontSize="small" />}
        />
        {typeof bookmarkCount == "number" && (
          <ButtonBookmark bookmarksCount={bookmarkCount} />
        )}
        {typeof likesCount == "number" && (
          <ButtonLike likesCount={likesCount} />
        )}
      </div>
    </>
  );
};

export default ProjectIconGroup;