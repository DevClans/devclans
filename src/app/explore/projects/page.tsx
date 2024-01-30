import ProjectItem from "@/components/listItems/ProjectItem";
import { ProjectProps } from "@/types/mongo/project.types";
import { Fetch } from "@/utils/fetchApi";
import { PageProps } from "@/types/page.types";
import { stringify } from "querystring";
import ToolBox from "@/components/ToolBox";

const Projects = async ({ params, searchParams }: Partial<PageProps>) => {
  const str = stringify(searchParams);
  console.log(str)
  const projects: ProjectProps[] =
    (await Fetch({
      endpoint: "/project" + (str ? `?${str}` : ""),
    })) || [];
  // console.log(projects, "projects in frontend");
  if (
    !Array.isArray(projects) ||
    (Array.isArray(projects) && projects.length === 0)
  ) {
    return <h3>No projects found</h3>;
  }
  return (
    <div className="fcfs w100 gap-6">
      <ToolBox count={projects.length} />
      {projects.map((product, i) => (
        <ProjectItem searchParams={searchParams} {...product} key={i} />
      ))}
    </div>
  );
};
export default Projects;
