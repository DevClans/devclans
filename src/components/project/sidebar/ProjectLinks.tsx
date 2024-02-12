"use client";
import { SidebarList } from "@/components";
import { ListItemProps } from "@/types/list.types";
import copyToClipboard from "@/lib/copyToClipboard";
import { selectIconForLinks } from "@/lib/socialIcons";
import { ProjectProps } from "@/types/mongo/project.types";
import ButtonLinkIcon from "@/components/buttons/ButtonLinkIcon";

const ProjectLinks = ({ links }: { links: ProjectProps["projectLinks"] }) => {
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
