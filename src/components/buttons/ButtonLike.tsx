"use client";
import {
  ButtonIcon,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@/components";
import { useState } from "react";

const ButtonLike = () => {
  const [liked, setLiked] = useState(false);
  const likeCount = 0;
  return (
    <>
      <ButtonIcon
        active={liked}
        setActive={setLiked}
        label={likeCount.toString()}
        activeIcon={<FavoriteRounded fontSize="small" />}
        icon={<FavoriteBorderRounded fontSize="small" />}
      />
    </>
  );
};

export default ButtonLike;
