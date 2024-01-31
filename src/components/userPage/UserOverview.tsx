import ReactMarkdown from "react-markdown";
import { ProjectDetailsItemProps } from "@/types/toggleList.types";
import { ProjectDetails } from "..";
const UserOverview = ({
  data,
  username,
}: {
  data: ProjectDetailsItemProps[];
  username: string;
}) => {
  return (
    <>
      <div id="overview" className="cardCommon">
        <h3>{username ? username + "'s" : ""} Activity</h3>
        <p>Activity graphs </p>
      </div>
      <ReactMarkdown className="cardCommon markdown">
        Github Readme
      </ReactMarkdown>
      <ProjectDetails
        headingClass="text-[14px]"
        heading={"faq about me"}
        containerClass="!gap-2"
        className="h-full !rounded-[10px]"
        data={data}
      />
    </>
  );
};

export default UserOverview;
