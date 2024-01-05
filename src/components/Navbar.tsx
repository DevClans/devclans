"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

function AuthButton() {
    const { data: session } = useSession();
  
    if (session) {
      return (
        <div className="flex justify-around my-4">
          <h1 className="py-2 px-4 bg-yellow-300 rounded-2xl">Hi, {session?.user?.name}</h1>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => signOut()}>Sign out</button>
        </div>
      );
    }
    return (
      <div className="flex justify-around my-4">
        <h1 className="py-2 px-4 bg-yellow-300 rounded-2xl">Not Signed In</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  export default function Navbar() {
    return(
        <div>
            <AuthButton />
        </div>
    )
  }