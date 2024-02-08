import { languagesColors } from "@/lib/languagesColors";
import { ProjectRepoDetailsProps } from "@/types/mongo/project.types";
import { IconGithub, IconOpenInNew, LinkWithIcon } from "..";
import { Calendar, GitCommitHorizontal, Github, Star } from "lucide-react";
import colors from "@/lib/colors";

const ProjectRepoDetails = ({
  languages,
  lastCommit,
  commits,
  created_at,
  updated_at,
  watchers_count,
}: Partial<ProjectRepoDetailsProps>) => {
  const dateString = (date?: string | Date) =>
    date && new Date(date).toDateString().substring(4);
  const moreDetails = [
    {
      label: "Last Commit",
      icon: <GitCommitHorizontal size={10} />,
      value: dateString(lastCommit),
    },
    {
      label: "Commits",
      icon: <GitCommitHorizontal size={10} />,
      value: commits,
    },
    {
      label: "Created At",
      icon: <Calendar size={10} />,
      value: dateString(created_at),
    },
    {
      label: "Updated At",
      icon: <Calendar size={10} />,
      value: dateString(updated_at),
    },
    {
      label: "Stars",
      icon: <Star size={10} />,
      value: watchers_count,
    },
  ];
  return (
    <>
      <div className="border border-border rounded-[10px] p-3 fcfs gap-2 lg:max-w-[360px]">
        <div className="frcsb w100">
          <h4 className="">Languages Used</h4>
          <LinkWithIcon
            icon={<IconOpenInNew color={colors.heading} size={12} />}
            iconLeft={<Github size={12} />}
            text="Github"
            href=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {languages?.map(
              ({ name, percentage, color }) =>
                name && (
                  <div
                    key={name}
                    className="flex-grow h-1 rounded-md"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor:
                        languagesColors[name.toLowerCase()] || color,
                    }}
                  ></div>
                )
            )}
          </div>
          <div className="flex gap-[7px] flex-wrap">
            {languages?.map(
              ({ name, percentage, color }, i) =>
                Boolean(name) && (
                  <div key={i} className="frc flex-shrink-0 gap-1">
                    <div
                      key={name}
                      className="w-[7px] h-[7px] rounded-sm"
                      style={{
                        backgroundColor:
                          languagesColors[name.toLowerCase()] || color,
                      }}
                    />
                    <p key={name} className="text-[10px]">
                      {name} ({Number(percentage).toFixed(2)}%)
                    </p>
                  </div>
                )
            )}
          </div>
          <div className="frc flex-wrap gap-2">
            {moreDetails.map(
              ({ value, label, icon }, i) =>
                Boolean(value) && (
                  <div key={i} className="frc gap-1">
                    <p className="text-[10px] text-heading">
                      {value?.toString()}
                    </p>
                    {icon}
                    <p className="text-[10px]">{label}</p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectRepoDetails;
