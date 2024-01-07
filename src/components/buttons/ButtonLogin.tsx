"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const ButtonLogin = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };
  return (
    <button onClick={handleClick} id="btnLogin">
      {session ? "Logout" : "Login"}
    </button>
  );
};

export default ButtonLogin;
