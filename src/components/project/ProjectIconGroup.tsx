"use client";
import { ButtonBookmark, ButtonIcon, ButtonLike, IosShareRounded } from "..";
import { Types } from "mongoose";
import ButtonShare from "../buttons/ButtonShare";
import { ShareProps } from "@/types/link.types";

const ProjectIconGroup = ({
  bookmarkCount,
  likesCount,
  showLabels = true,
  title,
  url,
  message,
}: {
  bookmarkCount?: number;
  likesCount?: number;
  showLabels?: boolean;
  title?: Types.ObjectId;
} & ShareProps) => {
  return (
    <>
      <div className="frc gap-[10px]">
        <ButtonShare showLabels={showLabels} url={url} message={message} />
        {typeof bookmarkCount == "number" && (
          <ButtonBookmark bookmarksCount={bookmarkCount} />
        )}
        {typeof likesCount == "number" && (
          <ButtonLike likesCount={likesCount} title={title} />
        )}
      </div>
    </>
  );
};

export default ProjectIconGroup;
