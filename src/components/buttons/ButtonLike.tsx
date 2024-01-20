"use client"
import {
  ButtonIcon,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@/components";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const ButtonLike = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { data: session } = useSession();
 

  useEffect(() => {

    const fetchLikeCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/db/getProject/satvik21/quizify",{
          method: "GET",
        
          headers: {
            "Content-Type": "application/json",
          },
        });;
        const data = await response.json();
        console.log(data)
        
        setLikeCount(data[0].likesCount);
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/db/getLiked/${session?.user?.name}/quizify`,{
          method: "GET",
        
          headers: {
            "Content-Type": "application/json",
          },
        });;
        const data = await response.json();
        console.log(data);
        if(data.length == 0){
          console.log("false");
          setLiked(false);
        }
        else{
          console.log("true");
          setLiked(true);
        }
   
      
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    }
    fetchIsLiked();
    
    fetchLikeCount();
  }, []); 

  const handleClick = async () => {
    let work;
    if(liked){
      work="removeLike";
    }
    else{
      work="addLike"
    }
    try {
      console.log(work)
      const response = await fetch(`http://localhost:3000/api/db/${work}`, {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.name,
          projectId: "quizify",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(session);
      const data = await response.json();
      console.log(data);
      if(liked){
        setLikeCount(data.project.likesCount);
      }
      else{
        setLikeCount(data.user.likesCount);
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
      label={likeCount.toString()}
      activeIcon={<FavoriteRounded color="primary" fontSize="small" />}

      icon={<FavoriteBorderRounded fontSize="small" />}
      onClick={handleClick}
    />

  );
};

export default ButtonLike;
