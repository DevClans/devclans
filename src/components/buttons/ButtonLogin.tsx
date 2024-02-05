"use client";
import { CircularProgress } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ButtonLogin = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

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
