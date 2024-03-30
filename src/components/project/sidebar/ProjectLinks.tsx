"use client";
import { SidebarList } from "@/components";
import { ListItemProps, SidebarListProps } from "@/types/list.types";
import copyToClipboard from "@/lib/copyToClipboard";
import { selectIconForLinks } from "@/lib/socialIcons";
import { ProjectProps } from "@/types/mongo/project.types";
import ButtonLinkIcon from "@/components/buttons/ButtonLinkIcon";

const ProjectLinks = ({
  links,
  heading,
  ...sidebarListProps
}: {
  links: (string | ListItemProps)[];
} & Partial<SidebarListProps>) => {
  if (!Array.isArray(links)) {
    return null;
  }
  const linkss: ListItemProps[] = links.map((link: string | ListItemProps) => {
    let data: Partial<ListItemProps> = {
      onEndIconClick: copyToClipboard,
    };
    if (typeof link == "string") {
      data["text"] = link?.split(".com/")?.[1];
      data["href"] = link;
      data["startIcon"] = selectIconForLinks(link);
      data["endIcon"] = <ButtonLinkIcon text={link} />;
    } else {
      data = {
        startIcon: selectIconForLinks(link.href!),
        endIcon: <ButtonLinkIcon text={link.text} />,
        ...link,
        onEndIconClick: copyToClipboard,
      };
    }
    return data as ListItemProps;
  });
  return (
    <>
      <SidebarList
        {...sidebarListProps}
        heading={heading || "project links"}
        list={linkss || []}
      />
    </>
  );
};

export default ProjectLinks;
