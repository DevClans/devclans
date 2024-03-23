import { PageProps } from "@/types/page.types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

const page = ({ searchParams }: PageProps) => {
  const error = searchParams?.error;
  if (error) {
    return (
      <div className="w-screen h-screen fccc gap-2">
        <h3>Try Again Later</h3>
        <p>Error: {error}</p>
      </div>
    );
  }
  return redirect("/api/auth/signin");
};

export default page;
