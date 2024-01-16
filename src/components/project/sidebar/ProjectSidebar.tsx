import { IconGithub, IconLink, SidebarList } from "@/components";
import { LookingForMembers } from ".";
import { ListItemProps } from "@/types/list.types";

const ProjectSidebar = () => {
  const links: ListItemProps[] = [
    {
      text: "https://github.com/username/repo",
      startIcon: <IconGithub />,
      endIcon: <IconLink />,
    },
  ];
  return (
    <div className="fcc max-w-[360px] w100 gap-[30px]">
      <LookingForMembers />
      <SidebarList heading="project links" list={links} />
    </div>
  );
};

export default ProjectSidebar;
