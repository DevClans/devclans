"use client";
import {
  BookmarkBorderOutlined,
  BookmarkRounded,
  ButtonIcon,
} from "@/components";
import { ButtonProps } from "@/types";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ButtonBookmark = (
  {
  bookmarksCount,
  isMarked,
  style,
  className,
}: {
  bookmarksCount: number;
  isMarked?: boolean;
} & Partial<ButtonProps>) => {
 let title:String;
  const [liked, setLiked] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const { data: session } = useSession();

  const userId = "65baa30ac89d8b732cadfdf2"
  const ownerId="65baa30ac89d8b732cadfdf2"
 title = "65baa4d8c89d8b732cadfdfe"
   //console.log(title);
  
   useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/db/getProject/${ownerId}/${title}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if(data){
          console.log(data.bookmarkCount)
        
          setBookmarkCount(data.bookmarkCount);
        }
      
      } catch (error) {
        console.error("Error fetching initial like count:", error);
      }
    };
    const fetchIsLiked = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/db/getBookmarked/${userId}/${title}`,
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
        if(data.length>0){
          if (data[0]._id) {
            console.log("false");
            setLiked(false);
          } else {
            console.log("true");
            setLiked(true);
          }
        } 
        else{
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

    const localBookmarkState = localStorage.getItem(`BookmarkState_${title}_${userId}`);

 if(localBookmarkState){
   
      setLiked(JSON.parse(localBookmarkState));
    }
    else{
    fetchIsLiked();
    }
    const localLikeNumber = localStorage.getItem(`BookmarkNumber_${title}`);
    if(localLikeNumber){
      console.log("Taken from local storage")
      setBookmarkCount(JSON.parse(localLikeNumber))
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
      work = "addBookmark";
    } else {
      work = "removeBookmark";
    }
    try {
      console.log(work);
      const response = await fetch(`http://localhost:3000/api/db/${work}`, {
        method: "POST",
        body: JSON.stringify({
          userId:ownerId,
          projectId: title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(title);
      const data = await response.json();
      console.log(liked);
      console.log(data);
     
        setBookmarkCount(data.project.bookmarkCount);
  
      console.log(bookmarkCount)
      localStorage.setItem(`BookmarkState_${title}_${userId}`, JSON.stringify(!liked));
      localStorage.setItem(`BookmarkNumber_${title}`,JSON.stringify(data.project.bookmarkCount));
      setBookmarkCount(data.project.bookmarkCount);
      setLiked(!liked);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <ButtonIcon
      active={!liked}
      setActive={setLiked}
      className={`${className}`}
      onClick={handleClick}
      label={bookmarkCount.toString()}
      activeIcon={<BookmarkRounded color="primary" fontSize="small" />}
      icon={<BookmarkBorderOutlined fontSize="small" />}
    />
  );
};

export default ButtonBookmark;
