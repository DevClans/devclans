"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonLogin = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Clear previous toasts when the component mounts
    toast.dismiss();

    // Check if the session is present (user is logged in) and show a toast
    if (session) {
      toast.success("Successfully Logged In");
    }
  }, []); // Re-run the effect when the session changes

  useEffect(() => {
    // Check if the session is not present (user is logged out) and show a toast
    if (!session) {
      toast.info("Successfully Logged Out");
    }
  }, [session]); // Re-run the effect when the session changes

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <button onClick={session ? handleLogout : handleLogin} id="btnLogin">
        {session ? "Logout" : "Login"}
      </button>
      <ToastContainer
        theme="dark"
      />
    </>
  );
};

export default ButtonLogin;