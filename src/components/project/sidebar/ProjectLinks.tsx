"use client";
import { IconGithub, IconLink, SidebarList } from "@/components";
import { ListItemProps } from "@/types/list.types";
import copyToClipboard from "@/lib/copyToClipboard";

const ProjectLinks = () => {
  const links: ListItemProps[] = [
    {
      text: "username/repo",
      href: "https://github.com/username/repo",
      startIcon: <IconGithub />,
      endIcon: <IconLink />,
      onEndIconClick: async (text: string) => {
        await copyToClipboard(text);
      },
    },
  ];
  return (
    <>
      <SidebarList heading="project links" list={links} />
    </>
  );
};

export default ProjectLinks;
