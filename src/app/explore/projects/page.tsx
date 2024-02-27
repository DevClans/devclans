import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import { Fetch } from "@/utils/fetchApi";
import { PageProps } from "@/types/page.types";
import { stringify } from "querystring";
import ProjectItems from "@/components/project/ProjectItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Projects",
  openGraph: {
    title: "Find Projects",
  },
  twitter: {
    title: "Find Projects",
  },
};

const Projects = async ({ params, searchParams }: Partial<PageProps>) => {
  const str = stringify(searchParams);
  // console.log("This is str" + str );
  // console.log(searchParams)
  const projects: ProjectSearchItemProps[] =
    (await Fetch({
      endpoint: "/project" + (str ? `?${str}` : ""),
      revalidate: 3600 * 3, // TODO - set revalidate time
    })) || [];
  console.log(
    Array.isArray(projects) && projects.length > 0,
    "projects in frontend"
  );
  return <ProjectItems projects={projects} searchParams={searchParams} />;
};
export default Projects;
