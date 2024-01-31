import { UserProjectProps } from "@/types/mongo/user.types";
import ProjectItem from "../listItems/ProjectItem";

const UserProjects = ({
  ownedProjects,
  contributedProjects,
}: UserProjectProps) => {
  console.log("render user projects");
  console.log(ownedProjects, "ownedProjects");
  if (
    (ownedProjects.length === 0 && contributedProjects.length === 0) ||
    !ownedProjects?.[0]?.title
  ) {
    return null;
  }
  return (
    <>
      {/* OWNED PROJECTS */}
      {ownedProjects?.map((project, i) => (
        <ProjectItem key={i} {...project} />
      ))}
    </>
  );
};

export default UserProjects;
