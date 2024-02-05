"use client";

import { useEffect } from "react";

// hide the div when top crosses 80px
const LeftSiderbarTopItem = () => {
  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const ele = document.getElementById("leftMenuHeader");
      // console.log(top, "top");
      if (ele) {
        if (top > 80) {
          ele.style.height = "0px";
        } else {
          ele.style.height = "75px";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      id="leftMenuHeader"
      className="h-16 hidden md:flex transition-[height] duration-300 ease-in-out"
    />
  );
};

export default LeftSiderbarTopItem;
