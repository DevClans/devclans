"use client";
import {
  BookmarkBorderOutlined,
  BookmarkRounded,
  ButtonIcon,
} from "@/components";
import { ButtonProps } from "@/types";
import { useState } from "react";

const ButtonBookmark = ({
  bookmarksCount,
  isMarked,
  style,
  className,
}: {
  bookmarksCount: number;
  isMarked?: boolean;
} & Partial<ButtonProps>) => {
  const [active, setActive] = useState(isMarked || false);
  const bookmarkCount = bookmarksCount + (active ? 1 : 0);
  return (
    <>
      <ButtonIcon
        style={{ ...style }}
        active={active}
        setActive={setActive}
        className={`${className}`}
        label={bookmarkCount.toString()}
        activeIcon={<BookmarkRounded color="primary" fontSize="small" />}
        icon={<BookmarkBorderOutlined fontSize="small" />}
      />
    </>
  );
};

export default ButtonBookmark;
