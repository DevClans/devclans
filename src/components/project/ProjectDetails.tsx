import { ProjectDetailsItem } from "@/components";
import {
  ProjectDetailsItemProps,
  ToogleListItemProps,
} from "@/types/toggleList.types";

const ProjectDetails = ({
  data,
  heading = "Project Details",
  style,
  className,
}: {
  data: ProjectDetailsItemProps[];
  heading?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const toogleData: ToogleListItemProps = {
    heading: "readme.md",
    data: [
      {
        title: "title",
        desc: "desc",
      },
    ],
  };

  const dummydata: ProjectDetailsItemProps[] = data || [
    {
      heading: "The Problem We Solve",
      data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      heading: "Challenges We Ran Into",
      data: [toogleData],
    },
  ];
  return (
    <div className={`w100 fcfs p-5 card2 ${className}`} style={style}>
      {heading && <h2 className="mb-7 ">{heading}</h2>}
      <div className="w100 fcc gap-7">
        {dummydata.map((item, index) => (
          <ProjectDetailsItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
