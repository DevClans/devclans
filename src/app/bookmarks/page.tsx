import ListPages from "@/components/ListPages";
import { PageProps } from "@/types/page.types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
  openGraph: {
    title: "Bookmarks",
  },
  twitter: {
    title: "Bookmarks",
  },
};

const page = ({ params }: PageProps) => {
  return (
    <>
      <ListPages type="bookmarks" />
    </>
  );
};

export default page;
