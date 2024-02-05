import ReactMarkdown from "react-markdown";
import { ProjectDetailsItemProps } from "@/types/toggleList.types";
import { ProjectDetails } from "..";
import GitHubGraph from "../GithubGraph";
import { UserProps } from "@/types/mongo/user.types";
import colors from "@/lib/colors";

const UserOverview = ({
  data,
  username,
  githubDetails,
}: {
  data: ProjectDetailsItemProps[];
  username: string;
  githubDetails?: UserProps["githubDetails"];
}) => {
  const { readme, username: githubUsername, login } = githubDetails || {};
  const removeHashTag = (str: string) => str?.replace("#", "") || "E2E8FF8C";
  const urlSettings = `&theme=transparent&bg_color=081121&title_color=${removeHashTag(
    colors.priDark
  )}&text_color=${removeHashTag(colors.text)}&border_color=${removeHashTag(
    colors.border
  )}&cache_seconds=86400&border_radius=10&text_bold=false&include_all_commits=true&ring_color=${removeHashTag(
    colors.priDark
  )}&rank_icon=percentile&card_width=390`;
  return (
    <>
      <div id="overview" className="cardCommon gap-4 flex flex-col w100">
        <h3>{username ? username + "'s" : ""} Activity</h3>
        <GitHubGraph username={login || githubUsername || ""} />
      </div>
      {readme && (
        <ReactMarkdown className="cardCommon markdown">{readme}</ReactMarkdown>
      )}
      {githubUsername && (
        <div className="cardCommon  fcfs gap-2">
          <div className="fcfs gap-1 mb-2">
            <h3 className="">Githubs Stats</h3>
            <p>
              This will help you understand the fields the user is adept in.
              (This includes data of public repos only.)
            </p>
          </div>
          <div className="flex items-start flex-row flex-wrap gap-2 ">
            <img
              src={`https://github-readme-stats-devclans.vercel.app/api?username=${login}&show_icons=true${urlSettings}`}
              alt={`${username}'s GitHub stats`}
            />
            <img
              src={`https://github-readme-stats-devclans.vercel.app/api/top-langs/?username=${login}&size_weight=0.5&count_weight=0.5&layout=compact${urlSettings}`}
              alt={`Top Langs`}
            />
          </div>
        </div>
      )}
      {/* {githubUsername && (
        <div className="cardCommon  fcfs gap-2">
          <div className="fcfs gap-1 mb-2">
            <h3 className="">Contribution Graph</h3>
            <p>
              A good way to understand how many hours the user is putting in
              work. (This includes data of public repos only.)
            </p>
          </div>

          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${login}&theme=github-compact&bg_color=081121&title_color=${removeHashTag(
              colors.priDark
            )}&color=${removeHashTag(
              colors.text
            )}&custom_title=30 Days Contribution Graph&line=${removeHashTag(
              colors.priDark
            )}&point=${removeHashTag(colors.text)}&hide_border=true`}
            alt={`${username}'s github activity graph`}
          />
        </div>
      )} */}
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
