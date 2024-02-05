import ListPages from "@/components/ListPages";
import { PageProps } from "@/types/page.types";

const page = ({ params }: PageProps) => {
  return (
    <>
      <ListPages type="bookmarks" />
    </>
  );
};

export default page;
