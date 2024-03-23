"use client";
import {
  ProjectTeam,
  LookingForMembers,
  ProjectLinks,
  Avatar,
} from "@/components";
import LinkGithub from "@/components/links/LinkGithub";
import { urlUser } from "@/constants";
import colors from "@/lib/colors";
import { ListItemProps } from "@/types/list.types";
import { UserSidebarProps } from "@/types/mongo/project.types";

const ProjectSidebar = ({
  team,
  links,
  skillLevel,
  contact,
}: UserSidebarProps) => {
  console.log("team", team);
  const teamData: ListItemProps[] = team.map(
    ({ username, discordId, _id, githubId }) => {
      return (
        _id && {
          text: username || "",
          href: urlUser({ username, id: _id.toString() }),
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
        }
      );
    }
  );
  return (
    <div className="lg:sticky lg:top-[40px] fcc lg:max-w-[360px] w100 gap-[30px]">
      <LookingForMembers type="projects" {...skillLevel} />
      <ProjectLinks links={links} />
      <ProjectTeam contact={contact} list={teamData} />
    </div>
  );
};

export default ProjectSidebar;
