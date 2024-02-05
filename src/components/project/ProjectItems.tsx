import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import ToolBox from "../ToolBox";
import ProjectItem from "../listItems/ProjectItem";
import { PageProps } from "@/types/page.types";

const ProjectItems = ({
  projects,
  searchParams,
}: { projects: ProjectSearchItemProps[] } & PageProps) => {
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

export default ProjectItems;
