import { FetchProjectDetailsProps } from "@/types/mongo/project.types";
import {
  ProjectDetailsItemProps,
  ToogleListItemProps,
} from "@/types/toggleList.types";

export const convertProjectDetails = (
  project: FetchProjectDetailsProps
): ProjectDetailsItemProps[] | null => {
  if (!project) {
    return null;
  }
  const convertedData: ProjectDetailsItemProps[] = [];
  const { problem, challenges, futureGoals, memberReq } = project;
  convertedData.push({
    heading: "Problem We Solve",
    data: problem,
  });
  const challengesData: ToogleListItemProps[] = [];
  challenges.forEach((challenge) => {
    challengesData.push({
      heading: challenge.title,
      data: [
        {
          title: "Description",
          desc: challenge.desc,
        },
        {
          title: "Solution",
          desc: challenge.solution as string,
        },
      ],
    });
  });
  convertedData.push({
    heading: "Challenges We Faced",
    data: challengesData,
  });
  const futureGoalsData: ToogleListItemProps[] = [];
  futureGoals.forEach((goal) => {
    futureGoalsData.push({
      heading: goal.title,
      data: [
        {
          title: "Description",
          desc: goal.desc,
        },
        {
          title: "Need Help",
          desc: goal.needHelp ? "Yes" : "No",
        },
      ],
    });
  });
  convertedData.push({
    heading: "Future Goals",
    data: futureGoalsData,
  });
  // const memberReqData: ToogleListItemProps[] = [];
  // memberReq.forEach((req) => {
  //   memberReq.push({
  //     heading: req.title,
  //     data: [
  //       {
  //         title: "Description",
  //         desc: req.desc,
  //       },
  //     ],
  //   });
  // });
  // convertedData.push({
  //   heading: "Member Requirements",
  //   data: memberReqData,
  // });

  return convertedData;
};
