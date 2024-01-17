"use client";
import {
  BookmarkBorderOutlined,
  BookmarkRounded,
  ButtonIcon,
} from "@/components";
import { useState } from "react";

const ButtonBookmark = ({
  bookmarksCount,
  isMarked,
}: {
  bookmarksCount: number;
  isMarked?: boolean;
}) => {
  const [active, setActive] = useState(isMarked || false);
  const bookmarkCount = bookmarksCount + (active ? 1 : 0);
  return (
    <>
      <ButtonIcon
        active={active}
        setActive={setActive}
        label={bookmarkCount.toString()}
        activeIcon={<BookmarkRounded color="primary" fontSize="small" />}
        icon={<BookmarkBorderOutlined fontSize="small" />}
      />
    </>
  );
};

export default ButtonBookmark;
