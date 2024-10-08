import { LightLine } from "@/components";
import ProjectItem from "@/components/listItems/ProjectItem";
import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import { PageProps } from "@/types/page.types";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { Fetch } from "@/utils/fetchApi";
import CommonHero from "./CommonHero";

const ListPages = async ({
  params,
  type = "likes",
}: PageProps & { type?: "bookmarks" | "likes" }) => {
  const sesssion: any = await getServerSessionForServer();
  const heading = type?.replace("s", "ed");
  const list: ProjectSearchItemProps[] =
    sesssion &&
    (await Fetch({
      endpoint: `/db/getLikeBookmark/${sesssion?.user?._id}/${type}`,
    }));
  return (
    <>
      <CommonHero heading={`${heading} Projects`} />
      <div className="container py-7">
        {sesssion ? (
          list.length > 0 ? (
            list?.map((like, i) => <ProjectItem key={i} {...like} />)
          ) : (
            <h3 className="text-text normal-case">
              No {heading} projects found
            </h3>
          )
        ) : (
          <h3 className="text-text normal-case">Login to find projects</h3>
        )}
      </div>
    </>
  );
};

export default ListPages;
