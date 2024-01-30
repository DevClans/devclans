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
import { UserTeamProps } from "@/types/mongo/user.types";

const ProjectSidebar = ({ team }: UserTeamProps) => {
  const links: ListItemProps[] = team.map(({ discordId, _id, githubId }) => {
    return {
      text: discordId,
      href: "/user/" + _id,
      startIcon: (
        <Avatar
          style={{
            border: "2px solid var(--border)",
            background: colors.cardBg,
            color: colors.highlight,
            height: "40px",
          }}
          alt={discordId}
        >
          {discordId && discordId[0]}
        </Avatar>
      ),
      endIcon: <LinkGithub href={`/${githubId}`} />,
    };
  });
  return (
    <div className="lg:sticky lg:top-[40px] fcc lg:max-w-[360px] w100 gap-[30px]">
      <LookingForMembers />
      <ProjectLinks />
      <ProjectTeam list={links} />
    </div>
  );
};

export default ProjectSidebar;
