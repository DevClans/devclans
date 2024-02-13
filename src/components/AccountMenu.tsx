"use client";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import colors from "@/lib/colors";
import { LightLine } from ".";
import { editProfile } from "@/paths";
import { urlUser } from "@/constants";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    minWidth: 220,
    color: "#fafafa",
    backgroundColor: colors.cardBg1,
    border: `1px solid ${colors.border}`,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {},
    "& .MuiMenuItem-root": {
      fontFamily: "var(--poppins)",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: colors.subH,
      },
      "&:active": {
        backgroundColor: colors.cardBg,
      },
    },
  },
}));

export default function AccountMenu({
  anchorEl,
  setAnchorEl,
  clicked,
  setClicked,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: boolean;
}) {
  const { data: session }: any = useSession();
  const userState = session?.user;
  // console.log("userState", userState, session);
  const open = Boolean(anchorEl);
  const userUrl = urlUser({
    username: userState?.username || userState?.displayName,
    id: userState?._id as string,
  });
  const userMenuItems = [
    {
      title: "Bookmarks",
      link: "/bookmarks",
      icon: <Dashboard fontSize="small" />,
    },
    {
      title: "Likes",
      link: "/likes",
    },
    {
      title: "View Profile",
      link: userUrl,
    },
    {
      title: "Edit Profile",
      link: editProfile(userState?._id as string),
    },
  ];
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="account-menu"
      className=""
      open={open && !clicked}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <div className="px-4 py-2 fcfs gap-2 w100">
        <Link href={userUrl}>
          <h3 className="!text-subH w100">{userState?.username}</h3>
        </Link>
        <LightLine />
        {userMenuItems.map(({ link, title }, i) => (
          <Link
            key={i}
            href={link}
            className="w100"
            onClick={() => {
              // send to dashboard
              handleClose();
            }}
          >
            <h4 className="font-medium w100">{title}</h4>
          </Link>
        ))}
        <LightLine />
        <button
          className="w100 !items-start"
          onClick={() => {
            try {
              setClicked(true);
              signOut();
              handleClose();
            } catch (error) {
              console.log("error in logout", error);
            }
          }}
        >
          {/* <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon> */}
          <h4 className="font-medium">Logout</h4>
        </button>
      </div>
    </StyledMenu>
  );
}
