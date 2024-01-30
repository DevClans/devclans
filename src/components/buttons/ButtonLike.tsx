"use client";
import {
  ButtonIcon,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@/components";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Fetch } from "@/utils/fetchApi";

const ButtonLike = (props: any) => {
  let title = props.title;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikeCount] = useState(0);
  const { data: session } = useSession();

  const userId = "saivi21";
  const ownerId = "saivi21";
  title = "65b67ad4b7c3dc79392510f9";
  //console.log(title);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await Fetch({
          endpoint: `getProject/satvik21/quizify`,
          method: "GET",
        });
        const data = await response.json();
        //  console.log(data)
        if (data) {
          //console.log(data.likesCount)

          setLikeCount(data.likesCount);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      try {
        const response = await Fetch({
          endpoint: `getLiked/${session?.user?.name}/quizify`,
          method: "GET",
        });
        const data = await response.json();
        //  console.log("This is data");
        // console.log(data);
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
    fetchIsLiked();

    fetchLikeCount();
  }, []);

  const handleClick = async () => {
    let work;
    if (liked) {
      work = "addLike";
    } else {
      work = "removeLike";
    }
    try {
      // console.log(work);
      const response = await fetch(`http://localhost:3000/api/db/${work}`, {
        method: "POST",
        body: JSON.stringify({
          userId: "saivi21",
          projectId: title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(title);
      const data = await response.json();
      //console.log(liked);
      //console.log(data);
      if (liked) {
        setLikeCount(data.project.likesCount);
      } else {
        setLikeCount(data.project.likesCount);
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <ButtonIcon
      active={liked}
      setActive={setLiked}
      label={likesCount.toString()}
      activeIcon={<FavoriteRounded color="primary" fontSize="small" />}
      icon={<FavoriteBorderRounded fontSize="small" />}
      onClick={handleClick}
    />
  );
};

export default ButtonLike;
