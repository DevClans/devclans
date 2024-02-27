import ListPages from "@/components/ListPages";
import { PageProps } from "@/types/page.types";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";

export const metadata: Metadata = generateCommonMetadata({
  title: "Bookmarks",
  urlEndpoint: "/bookmarks",
});

const page = ({ params }: PageProps) => {
  return (
    <>
      <ListPages type="bookmarks" />
    </>
  );
};

export default page;
