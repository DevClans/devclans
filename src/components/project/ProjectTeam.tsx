import { ListItemProps } from "@/types/list.types";
import { LightLine, SidebarList, ButtonConnect } from "@/components";
import { ContactDetailsProps } from "@/types/mongo/user.types";

const ProjectTeam = ({
  list,
  contact,
}: {
  list: ListItemProps[];
  contact: ContactDetailsProps[];
}) => {
  if (list?.length === 0) {
    return null;
  }
  return (
    <div className="card2 w100">
      {/* TODO show user avatars in team list  */}
      <SidebarList
        needIconBg={false}
        onlyList={true}
        heading="project team"
        list={list}
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
        <ButtonConnect contact={contact} />
      </div>
    </div>
  );
};

export default ProjectTeam;
