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
  const [liked, setLiked] = useState(true);
  const [likesCount, setLikeCount] = useState(0);
  const { data: session } = useSession();

  const userId = "65baa30ac89d8b732cadfdf2";
  const ownerId = "65baa30ac89d8b732cadfdf2";
  title = "65baa4d8c89d8b732cadfdfe";
  //console.log(title);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const data = await Fetch({
          endpoint: `/db/getProject/${userId}/${title}`,
          method: "GET",
        });
       
        //  console.log(data)
        if (data) {
          console.log(data.likesCount)

          setLikeCount(data.likesCount);
        }
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      try {
        const data = await Fetch({
          endpoint: `/db/getLiked/${userId}/${title}`,
          method: "GET",
        });
      
         console.log("This is data");
        console.log(data);
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

    const localLikedState = localStorage.getItem(`likedState_${title}_${userId}`);
    if(localLikedState){
    
      setLiked(JSON.parse(localLikedState));
    }
    else{
    fetchIsLiked();
    }

    const localLikeNumber = localStorage.getItem(`likeNumber_${title}`);
    if(localLikeNumber){
      console.log("Taken from local storage")
      setLikeCount(JSON.parse(localLikeNumber))
    }
    else{
    fetchLikeCount();
    }
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
          userId: "65baa30ac89d8b732cadfdf2",
          projectId: title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(title);
      const data = await response.json();
      //console.log(liked);
      console.log(data);
    
      console.log(data.project.likesCount)
      localStorage.setItem(`likedState_${title}_${userId}`, JSON.stringify(!liked));
      localStorage.setItem(`likedNumber_${title}`, JSON.stringify(data.project.likesCount));
      setLikeCount(data.project.likesCount);
      setLiked(!liked);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <ButtonIcon
      active={!liked}
      setActive={setLiked}
      label={likesCount?.toString()}
      activeIcon={<FavoriteRounded color="primary" fontSize="small" />}
      icon={<FavoriteBorderRounded fontSize="small" />}
      onClick={handleClick}
    />
  );
};

export default ButtonLike;
