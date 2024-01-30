"use client";
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";
import { Types } from "mongoose";

const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
  title
}: {
  bookmarkCount?: number;
  likesCount?: number;
  showLabels?: boolean;
  title?:Types.ObjectId;
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
          <ButtonLike likesCount={likesCount} title={title}/>
        )}
      </div>
    </>
  );
};

export default ProjectIconGroup;