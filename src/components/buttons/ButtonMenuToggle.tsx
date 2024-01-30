"use client";

import { MenuRounded } from "@mui/icons-material";
import { CloseRounded, MuiIconButton } from "..";
import { ButtonProps } from "@/types";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ButtonMenuToggle = ({ className }: Partial<ButtonProps>) => {
  const handleClick = () => {
    console.log("ButtonMenuToggle clicked");
    const menu = document.getElementById("menuIcon");
    const menuState = menu?.getAttribute("data-state");
    const openMenu = document.getElementById("openMenu");
    if (menuState === "open") {
      menu?.setAttribute("data-state", "close");
      openMenu?.style.setProperty("display", "none");
    } else {
      menu?.setAttribute("data-state", "open");
      openMenu?.style.setProperty("display", "flex");
    }
  };
  const pathname = usePathname();
  useEffect(() => {
    const menu = document.getElementById("menuIcon");
    const menuState = menu?.getAttribute("data-state");
    const openMenu = document.getElementById("openMenu");
    if (menuState === "open") {
      menu?.setAttribute("data-state", "close");
      openMenu?.style.setProperty("display", "none");
    }
    console.log("pathname", pathname, pathname === "/");
    if (pathname === "/") {
      document.getElementById("header")?.setAttribute("data-ishome", "true");
    }
  }, [pathname]);
  return (
    <>
      <MuiIconButton
        id="menuIcon"
        className={`${className} group/menu text-heading`}
        data-state="open"
        onClick={handleClick}
      >
        <CloseRounded
          fontSize="medium"
          className="group-data-[state=close]/menu:hidden"
        />
        <MenuRounded
          fontSize="medium"
          className="group-data-[state=open]/menu:hidden"
        />
      </MuiIconButton>
    </>
  );
};

export default ButtonMenuToggle;
