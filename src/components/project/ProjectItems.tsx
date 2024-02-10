import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import ToolBox from "../ToolBox";
import ProjectItem from "../listItems/ProjectItem";
import { PageProps } from "@/types/page.types";

const ProjectItems = ({
  projects,
  searchParams,
}: { projects: ProjectSearchItemProps[] } & PageProps) => {
  const noProjects =
    !Array.isArray(projects) ||
    (Array.isArray(projects) && projects.length === 0);
  return (
    <div className="fcfs w100 gap-6">
      <ToolBox count={projects.length} />
      {noProjects ? (
        <h3 className="text-subH">No projects found</h3>
      ) : (
        projects.map((product, i) => (
          <ProjectItem searchParams={searchParams} {...product} key={i} />
        ))
      )}
    </div>
  );
};

export default ProjectItems;
