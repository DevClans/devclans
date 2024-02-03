"use client";
import {
  ProjectTeam,
  LookingForMembers,
  ProjectLinks,
  Avatar,
} from "@/components";
import LinkGithub from "@/components/links/LinkGithub";
import colors from "@/lib/colors";
import { ListItemProps } from "@/types/list.types";
import { UserSidebarProps } from "@/types/mongo/project.types";

const ProjectSidebar = ({
  team,
  links,
  needMembers,
  contact,
}: UserSidebarProps) => {
  const teamData: ListItemProps[] = team.map(
    ({ username, discordId, _id, githubId }) => {
      return {
        text: username || "",
        href: "/user/" + _id,
        startIcon: (
          <Avatar
            style={{
              border: "2px solid var(--border)",
              background: colors.cardBg,
              color: colors.highlight,
              height: "40px",
            }}
            className="uppercase"
            alt={username}
          >
            {username && username[0]}
          </Avatar>
        ),
        endIcon: <LinkGithub href={`/${githubId}`} />,
      };
    }
  );
  return (
    <div className="lg:sticky lg:top-[40px] fcc lg:max-w-[360px] w100 gap-[30px]">
      <LookingForMembers {...needMembers} />
      <ProjectLinks links={links} />
      <ProjectTeam contact={contact} list={teamData} />
    </div>
  );
};

export default ProjectSidebar;
