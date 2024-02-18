"use client";
import { CircularProgress } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAvatarMenu from "../AvatarMenu";

const ButtonLogin = () => {
  const [loading, setLoading] = useState(false);
  const { data: session }: any = useSession();
  useEffect(() => {
    console.log("SESSION", session);
    if (session?.error === "RefreshAccessTokenError") {
      signIn("discord", undefined, {
        prompt: "consent",
      }); // Force sign in to hopefully resolve error
    }
  }, [session]);
  const handleLogin = async () => {
    setLoading(true);
    await signIn();
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    toast.info("Successfully Logged Out");
    setLoading(false);
  };
  if (session) {
    return <UserAvatarMenu username={session?.user?.username} />;
  }

  return (
    <button
      disabled={loading}
      onClick={session ? handleLogout : handleLogin}
      id="btnLogin"
    >
      {loading ? (
        <CircularProgress size={14} color="inherit" />
      ) : session ? (
        "Logout"
      ) : (
        "Login"
      )}
    </button>
  );
};

export default ButtonLogin;
