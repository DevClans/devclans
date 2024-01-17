import { ListItemProps } from "@/types/list.types";
import { Avatar, LightLine, SidebarList, ButtonConnect } from "@/components";
import LinkGithub from "../links/LinkGithub";
import colors from "@/lib/colors";

const ProjectTeam = () => {
  const name = "Rahul Tripathi";
  const links: ListItemProps[] = [
    {
      text: name,
      href: "/user/" + name.toLowerCase().replace(/\s+/g, ""),
      startIcon: (
        <Avatar
          style={{
            border: "2px solid var(--border)",
            background: colors.cardBg,
            color: colors.highlight,
            height: "40px",
          }}
          alt={name}
        >
          {name && name[0]}
        </Avatar>
      ),
      endIcon: <LinkGithub href={"/"} />,
    },
  ];
  return (
    <div className="card2 w100">
      <SidebarList
        needIconBg={false}
        onlyList={true}
        heading="project team"
        list={links}
      />
      <div className="p-5 gap-[5px] fcfs pt-0">
        <LightLine />
        <div className="mt-[10px]" />
        <h3>Want to connect to the project team?</h3>
        <p className="">
          {`We're here to make it easy for you! Let us link you up with the team's
          favorite social media accounts for smooth communication. 😎`}
        </p>
        <div className="mt-[5px]" />
        <ButtonConnect />
      </div>
    </div>
  );
};

export default ProjectTeam;
