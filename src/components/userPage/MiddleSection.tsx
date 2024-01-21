import colors from "@/lib/colors";
import { IconAll, ProjectDetails } from "..";
import InfoWithIcons from "./InfoWithIcons";
import { InfoWithIconProps } from "@/types/list.types";
import RandomInfoCard from "./RandomInfoCard";
import ReactMarkdown from "react-markdown";
import ButtonGroupUserSections from "../buttonGroups/ButtonGroupUserSections";
import { ButtonProps } from "@/types";

const MiddleSection = () => {
  const data = [
    {
      icon: <IconAll color={colors.subH} />,
      title: "hello",
      desc: "This is a test",
    },
    {
      icon: <IconAll color={colors.subH} />,
      title: "hello 2",
      desc: "This is a test 2",
    },
  ];
  const sections: ButtonProps[] = [
    {
      label: "Overview",
      activeLabel: "Learn About Me",
    },
    {
      label: "Projects",
      activeLabel: "See My Projects",
    },
    {
      label: "Experience",
      activeLabel: "See My Experience",
    },
    {
      label: "Education",
      activeLabel: "See My Education",
    },
    {
      label: "Contact",
      activeLabel: "Contact Me",
    },
  ];
  const randomInfo = {
    user: "Damian",
    title: "title",
    desc: "some data comes here",
  };
  return (
    <>
      <div className="fcfs w100 gap-6">
        <TopFeatures data={data} />
        <RandomInfoCard {...randomInfo} />
        <ButtonGroupUserSections data={sections} />
        <div className="cardCommon">
          <h3>Damian Activity</h3>
          <p>Activity graphs </p>
        </div>
        <ReactMarkdown className="cardCommon markdown">
          Github Readme
        </ReactMarkdown>
        <ProjectDetails
          heading={""}
          className="h-full"
          data={[
            {
              heading: "The Problem We Solve",
              headingClass: "text-heading text-sm font-semibold",
              data: [
                {
                  heading: "Hello",
                  data: [{ title: "Hello", desc: "Hello" }],
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default MiddleSection;

const TopFeatures = ({ data }: { data: InfoWithIconProps[] }) => {
  return (
    <>
      <div className="frc w100 gap-6">
        {data.map((item, i) => (
          <InfoWithIcons key={i} {...item} />
        ))}
      </div>
    </>
  );
};
