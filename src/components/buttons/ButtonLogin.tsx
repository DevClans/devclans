"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ButtonLogin = () => {
  const { data: session } = useSession();
  

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut().finally(() => {
      toast.info("Successfully Logged Out");
    });
  };

  return (
    <div>
      <button onClick={session ? handleLogout : handleLogin} id="btnLogin">
        {session ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default ButtonLogin;
