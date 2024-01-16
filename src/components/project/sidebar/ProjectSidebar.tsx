"use client";
import { ProjectTeam, LookingForMembers, ProjectLinks } from "@/components";

const ProjectSidebar = () => {
  return (
    <div className="fcc max-w-[360px] w100 gap-[30px]">
      <LookingForMembers />
      <ProjectLinks />
      <ProjectTeam />
    </div>
  );
};

export default ProjectSidebar;
