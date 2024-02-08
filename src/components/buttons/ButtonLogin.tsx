"use client";
import { CircularProgress } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProviders } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from "next/router";
import { useEffect } from "react";
const ButtonLogin = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
// <<<<<<< satvik

  

//   useEffect( () => {
//     // console.log(session);
//     // Check if the session is not present (user is logged out) and show a toast
//     async function foo(){
//       if (!session?.user) {
//         toast.info("Successfully Logged Out");
//       } else {
//         const providers = await getProviders()
//         console.log("Providers", providers)
//         toast.success("Successfully Logged In");
//         const userKeys = Object.keys(session?.user);
//         console.log(userKeys.length);
//         if(userKeys.length > 1){
//           console.log("Discord");
//         }
//         else{
//           console.log("Google");
          
         
//         }       
//       }
//     }
//     foo();

//   }, [session]); // Re-run the effect when the session changes

//   const handleLogin = () => {
//      signIn();
// =======

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
