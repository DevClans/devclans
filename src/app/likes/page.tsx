import ListPages from "@/components/ListPages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Likes",
  openGraph: {
    title: "Likes",
  },
  twitter: {
    title: "Likes",
  },
};

const page = () => {
  return (
    <>
      <ListPages />
    </>
  );
};

export default page;
