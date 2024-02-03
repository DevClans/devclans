"use client";
import { IconLink, SidebarList } from "@/components";
import { ListItemProps } from "@/types/list.types";
import copyToClipboard from "@/lib/copyToClipboard";
import { selectIconForLinks, socialIcons } from "@/lib/socialIcons";
import { ProjectProps } from "@/types/mongo/project.types";
import ButtonLinkIcon from "@/components/buttons/ButtonLinkIcon";

const ProjectLinks = ({ links }: { links: ProjectProps["projectLinks"] }) => {
  const dummyLink = "https://github.com/username/repo";
  const linkss: ListItemProps[] = links.map((link) => {
    return {
      text: link?.split(".com/")?.[1],
      href: link,
      startIcon: selectIconForLinks(link),
      endIcon: <ButtonLinkIcon text={link} />,
      onEndIconClick: copyToClipboard,
    };
  });
  return (
    <>
      <SidebarList heading="project links" list={linkss || []} />
    </>
  );
};

export default ProjectLinks;
