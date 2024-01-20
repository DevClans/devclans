import ProjectItem from "@/components/listItems/ProjectItem";
import { ProjectProps } from "@/types/mongo/project.types";
import { Fetch } from "@/utils/fetchApi";

const page = async () => {
  const projects: ProjectProps[] = await Fetch({ endpoint: "/project" });
  console.log(projects, "projects");
  return (
    <div className="fcfs w100 gap-6">
      {projects.map((product, i) => (
        <ProjectItem {...product} key={i} />
      ))}
    </div>
  );
};

export default page;
