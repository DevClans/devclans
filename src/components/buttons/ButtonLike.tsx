"use client";
import {
  ButtonIcon,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@/components";
import { useState } from "react";

const ButtonLike = ({
  likesCount,
}: {
  likesCount: number;
  isLiked?: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const likeCount = likesCount + (liked ? 1 : 0);
  return (
    <>
      <ButtonIcon
        active={liked}
        setActive={setLiked}
        label={likeCount.toString()}
        activeIcon={<FavoriteRounded color="primary" fontSize="small" />}
        icon={<FavoriteBorderRounded fontSize="small" />}
      />
    </>
  );
};

export default ButtonLike;
