"use client";
import {
  ButtonIcon,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@/components";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Fetch } from "@/utils/fetchApi";
import { Types } from "mongoose";
import { toast } from "react-toastify";

const ButtonLike = ({
  _id,
  likeCount,
}: {
  _id: Types.ObjectId | string;
  likeCount: number;
}) => {
  const projectId = _id;
  const [liked, setLiked] = useState(true);
  const [likesCount, setLikeCount] = useState(likeCount);
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession();

  const userId = session?.user?._id;
  // console.log(title);

  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!(userId && projectId)) {
        console.error("User ID or Project ID not found in fetchLikeCount()");
        return;
      }
      try {
        const data = await Fetch({
          endpoint: `/db/getProject/${userId}/${projectId}`,
          method: "GET",
        });

        //  console.log(data)
        if (data) {
          // console.log(data.likesCount);

          setLikeCount(data.likesCount);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      if (!(userId && projectId)) {
        console.error("User ID or Project ID not found in fetchIsLiked()");
        return;
      }
      try {
        const data = await Fetch({
          endpoint: `/db/getLiked/${userId}/${projectId}`,
          method: "GET",
        });

        // console.log("This is data");
        // console.log(data);
        if (data.length > 0) {
          if (data[0]._id) {
            // console.log("false");
            setLiked(false);
          } else {
            // console.log("true");
            setLiked(true);
          }
        } else {
          setLiked(true);
          // console.log(true);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const cleanupLocalStorage = () => {
      localStorage.clear();
    };

    var hour = 24;
    const cleanupInterval = setInterval(
      cleanupLocalStorage,
      hour * 60 * 60 * 1000
    );

    const localLikedState = localStorage.getItem(
      `likedState_${projectId}_${userId}`
    );
    if (localLikedState) {
      setLiked(JSON.parse(localLikedState));
    } else {
      fetchIsLiked();
    }

    const localLikeNumber = localStorage.getItem(`likeNumber_${projectId}`);
    if (localLikeNumber) {
      // console.log("Taken from local storage");
      setLikeCount(JSON.parse(localLikeNumber));
    } else {
      fetchLikeCount();
    }
    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);

  const handleClick = async () => {
    if (!session) {
      toast.warning("You must be signed in to like a project");
      return;
    }
    if (!(userId && projectId)) {
      console.error("User ID or Project ID not found in handleCilck()");
      return;
    }
    let work;
    if (liked) {
      work = "addLike";
    } else {
      work = "removeLike";
    }
    try {
      // console.log(work);
      setLoading(true);
      const data = await Fetch({
        endpoint: `/db/${work}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userId: userId,
          projectId: projectId,
        },
      });
      // console.log(title)
      // console.log(liked);
      if (data) {
        setLoading(false);
        // console.log(data);

        // console.log(data.project.likesCount);
        localStorage.setItem(
          `likedState_${projectId}_${userId}`,
          JSON.stringify(!liked)
        );
        localStorage.setItem(
          `likedNumber_${projectId}`,
          JSON.stringify(data.project.likesCount)
        );
        setLikeCount(data.project.likesCount);
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <>
      <ButtonIcon
        active={!liked}
        setActive={setLiked}
        disabled={loading}
        label={loading ? "Loading" : likesCount?.toString()}
        activeIcon={<FavoriteRounded color="primary" fontSize="small" />}
        icon={<FavoriteBorderRounded fontSize="small" />}
        onClick={handleClick}
      />
    </>
  );
};

export default ButtonLike;
