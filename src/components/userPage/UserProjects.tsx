import { UserProjectProps } from "@/types/mongo/user.types";
import ProjectItem from "../listItems/ProjectItem";
import { Types } from "mongoose";

const UserProjects = ({
  ownedProjects,
  contributedProjects,
}: UserProjectProps) => {
  // console.log("render user projects");
  // console.log(ownedProjects, "ownedProjects");
  if (
    (ownedProjects.length === 0 && contributedProjects.length === 0) ||
    !ownedProjects?.[0]?.title
  ) {
    return (
      <div className="cardCommon w100">
        <h4 className="text-text">No Projects Found</h4>
      </div>
    );
  }
  return (
    <>
      {/* OWNED PROJECTS */}
      {ownedProjects?.map((project, i) => (
        <ProjectItem
          key={i}
          {...project}
          owner={project.owner as Types.ObjectId}
        /> // Cast the owner property to ObjectId
      ))}
    </>
  );
};

export default UserProjects;
