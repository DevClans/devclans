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
  const [loading, setLoading]=useState(false);
  const { data: session } = useSession();

  const userId = "65bcd41c0e3d1d3d4f7d5cdb";
  const ownerId = "65bcd41c0e3d1d3d4f7d5cdb";
  title = "65bcee7e0e3d1d3d4f7d5d08";
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
    const cleanupLocalStorage = () => {
      localStorage.clear();
    };

    var hour = 24;
    const cleanupInterval = setInterval(cleanupLocalStorage, hour*60*60*1000);


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
    return () => {
      clearInterval(cleanupInterval);
    };
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
      setLoading(true)
      const response = await fetch(`http://localhost:3000/api/db/${work}`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          projectId: title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(title);
      const data = await response.json();
      //console.log(liked);
      if(data){
        setLoading(false)
        console.log(data);
    
        console.log(data.project.likesCount)
        localStorage.setItem(`likedState_${title}_${userId}`, JSON.stringify(!liked));
        localStorage.setItem(`likedNumber_${title}`, JSON.stringify(data.project.likesCount));
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
      label={ loading ? "Loading":likesCount?.toString()}
      activeIcon={<FavoriteRounded color="primary" fontSize="small" />}
      icon={<FavoriteBorderRounded fontSize="small" />}
      onClick={handleClick}
      
    />


    </>
 
  );
};

export default ButtonLike;
