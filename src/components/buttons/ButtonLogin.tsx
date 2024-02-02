"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ButtonLogin = () => {
  const { data: session } = useSession();
  

  useEffect(() => {
    // console.log(session);
    // Check if the session is not present (user is logged out) and show a toast
    if (!session) {
      toast.info("Successfully Logged Out");
    } else {
      toast.success("Successfully Logged In");
    }
  }, [session]); // Re-run the effect when the session changes

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
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
