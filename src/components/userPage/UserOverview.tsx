import ReactMarkdown from "react-markdown";
import { ProjectDetailsItemProps } from "@/types/toggleList.types";
import { ProjectDetails } from "..";
const UserOverview = ({ data }: { data: ProjectDetailsItemProps[] }) => {
  return (
    <>
      <div className="cardCommon">
        <h3>Damian Activity</h3>
        <p>Activity graphs </p>
      </div>
      <ReactMarkdown className="cardCommon markdown">
        Github Readme
      </ReactMarkdown>
      <ProjectDetails
        headingClass="text-[14px]"
        heading={"faq about me"}
        containerClass="!gap-2"
        className="h-full"
        data={data}
      />
    </>
  );
};

export default UserOverview;
