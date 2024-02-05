"use client";
import {
  BookmarkBorderOutlined,
  BookmarkRounded,
  ButtonIcon,
} from "@/components";
import { ButtonProps } from "@/types";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Types } from "mongoose";
import { toast } from "react-toastify";

const ButtonBookmark = ({
  bookmarksCount,
  isMarked,
  style,
  className,
  _id,
}: {
  bookmarksCount: number;
  isMarked?: boolean;
  _id: string | Types.ObjectId;
} & Partial<ButtonProps>) => {
  const projectId = _id;
  const [liked, setLiked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarksCount);
  const { data: session }: any = useSession();

  const userId = session?.user?._id;
  const ownerId = session?.user?._id;
  //console.log(title);

  useEffect(() => {
    const fetchLikeCount = async () => {
      if (!(userId && projectId)) {
        console.error("User ID or Project ID not found in bk fetchIsCount()");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/api/db/getProject/${ownerId}/${projectId}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data) {
          console.log(data.bookmarkCount);

          setBookmarkCount(data.bookmarkCount);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      if (!(userId && projectId)) {
        console.error("User ID or Project ID not found in bk fetchIsLiked()");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/api/db/getBookmarked/${userId}/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log("This is data");
        //console.log(data);
        if (data.length > 0) {
          if (data[0]._id) {
            console.log("false");
            setLiked(false);
          } else {
            console.log("true");
            setLiked(true);
          }
        } else {
          setLiked(true);
          console.log(true);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const localBookmarkState = localStorage.getItem(
      `BookmarkState_${projectId}_${userId}`
    );

    if (localBookmarkState) {
      setLiked(JSON.parse(localBookmarkState));
    } else {
      fetchIsLiked();
    }
    const localLikeNumber = localStorage.getItem(`BookmarkNumber_${projectId}`);
    if (localLikeNumber) {
      console.log("Taken from local storage");
      setBookmarkCount(JSON.parse(localLikeNumber));
    } else {
      fetchLikeCount();
    }
    //setLoading(false);
  }, []);

  const handleClick = async () => {
    if (!session) {
      toast.warning("You must be signed in to bookmark a project");
      return;
    }
    if (!(userId && projectId)) {
      console.error("User ID or Project ID not found in handleCilck()");
      return;
    }
    let work;
    if (liked) {
      work = "addBookmark";
    } else {
      work = "removeBookmark";
    }
    try {
      console.log(work);
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/db/${work}`, {
        method: "POST",
        body: JSON.stringify({
          userId: ownerId,
          projectId: projectId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(title);
      const data = await response.json();
      if (data) {
        setLoading(false);
        console.log(liked);
        console.log(data);

        setBookmarkCount(data.project.bookmarkCount);

        console.log(bookmarkCount);
        localStorage.setItem(
          `BookmarkState_${projectId}_${userId}`,
          JSON.stringify(!liked)
        );
        localStorage.setItem(
          `BookmarkNumber_${projectId}`,
          JSON.stringify(data.project.bookmarkCount)
        );
        setBookmarkCount(data.project.bookmarkCount);
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
        className={`${className}`}
        onClick={handleClick}
        label={loading ? "Loading" : bookmarkCount.toString()}
        activeIcon={<BookmarkRounded color="primary" fontSize="small" />}
        icon={<BookmarkBorderOutlined fontSize="small" />}
      />
    </>
  );
};

export default ButtonBookmark;
