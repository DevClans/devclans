import ListPages from "@/components/ListPages";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";

export const metadata: Metadata = generateCommonMetadata({
  title: "Likes",
  urlEndpoint: "/likes",
});

const page = () => {
  return (
    <>
      <ListPages />
    </>
  );
};

export default page;
