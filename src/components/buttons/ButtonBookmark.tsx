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
  const [liked, setLiked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const { data: session } = useSession();

  const userId = "saivi21"
  const ownerId="saivi21"
 title = "65b67ad4b7c3dc79392510f9"
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
   fetchIsLiked();

  fetchLikeCount();
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
          userId:"saivi21",
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
      if (liked) {
        setBookmarkCount(data.user.bookmarkCount);
      } else {
        setBookmarkCount(data.project.bookmarkCount);
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
      className={`${className}`}
      onClick={handleClick}
      label={bookmarkCount.toString()}
      activeIcon={<BookmarkRounded color="primary" fontSize="small" />}
      icon={<BookmarkBorderOutlined fontSize="small" />}
    />
  );
};

export default ButtonBookmark;
