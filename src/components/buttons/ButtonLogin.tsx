"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProviders } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from "next/router";
import { useEffect } from "react";
const ButtonLogin = () => {
  const { data: session } = useSession();

  

  useEffect( () => {
    // console.log(session);
    // Check if the session is not present (user is logged out) and show a toast
    async function foo(){
      if (!session?.user) {
        toast.info("Successfully Logged Out");
      } else {
        const providers = await getProviders()
        console.log("Providers", providers)
        toast.success("Successfully Logged In");
        const userKeys = Object.keys(session?.user);
        console.log(userKeys.length);
        if(userKeys.length > 1){
          console.log("Discord");
        }
        else{
          console.log("Google");
          
         
        }       
      }
    }
    foo();

  }, [session]); // Re-run the effect when the session changes

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
