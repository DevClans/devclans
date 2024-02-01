"use client";
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";
import { Types } from "mongoose";
import ButtonShare from "../buttons/ButtonShare";
import { ShareProps } from "@/types/link.types";

const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
  _id,
  url,
  message,
}: {
  bookmarkCount?: number;
  likesCount?: number;
  showLabels?: boolean;
  _id?: Types.ObjectId;
} & ShareProps) => {
  return (
    <>
      <div className="frc gap-[10px]">
        <ButtonShare showLabels={showLabels} url={url} message={message} />
        {typeof bookmarkCount == "number" && (
          <ButtonBookmark _id={_id || ""} bookmarksCount={bookmarkCount} />
        )}
        {typeof likesCount == "number" && (
          <ButtonLike likeCount={likesCount} _id={_id || ""} />
        )}
      </div>
    </>
  );
};

export default ProjectIconGroup;
