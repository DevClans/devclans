"use client";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import { Avatar, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { discordImgUrl } from "@/lib/userAvatar";

const UserAvatarMenu = ({ username }: { username: string }) => {
  const [clicked, setCliked] = useState<boolean>(false);
  const session: any = useSession();
  const avatarUrl = discordImgUrl(
    session.data?.user?.discordId,
    session.data?.user?.avatar
  );
  // console.log("avatarUrl", avatarUrl);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  return (
    <div>
      <button
        style={{
          height: 40,
          width: 40,
          color: "var(--white)",
        }}
        onClick={handleClick}
        className="uppercase font-semibold fccc loginBtnStyle"
      >
        {clicked ? (
          <CircularProgress color="inherit" size={14} />
        ) : (
          <Avatar
            className="loginBtnStyle !text-base"
            sx={{
              fontFamily: "var(--poppins)",
              borderRadius: "none",
            }}
            src={avatarUrl}
            alt={username}
          >
            {username[0]}
          </Avatar>
        )}
      </button>
      <AccountMenu
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        clicked={clicked}
        setClicked={setCliked}
      />
    </div>
  );
};

export default UserAvatarMenu;
