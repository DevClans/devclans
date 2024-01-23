import InfoWithIcons from "./InfoWithIcons";
import { InfoWithIconProps } from "@/types/list.types";
import RandomInfoCard from "./RandomInfoCard";
import ButtonGroupUserSections from "../buttonGroups/ButtonGroupUserSections";
import { ButtonProps } from "@/types";
import userQuestions from "@/lib/userQuestions";
import { UserQuestionsProps } from "@/types/mongo/user.types";
import { PageProps } from "@/types/page.types";

const MiddleSection = ({
  questions,
  username,
  children,
  params,
}: {
  questions: UserQuestionsProps;
  username: string;
} & React.PropsWithChildren &
  PageProps) => {
  const id = params?.id;
  const arr = userQuestions({ questions });
  const data = arr.length > 2 ? arr.slice(0, 2) : [];
  const sections: ButtonProps[] = [
    {
      label: "Overview",
      activeLabel: "Learn About Me",
      href: `/user/${id}`,
    },
    {
      label: "Projects",
      activeLabel: "See My Projects",
      href: `/user/${id}/projects`,
    },
    {
      label: "Experience",
      activeLabel: "See My Experience",
      href: `/user/${id}/experience`,
    },
    {
      label: "Education",
      activeLabel: "See My Education",
      href: `/user/${id}/education`,
    },
    {
      label: "Contact",
      activeLabel: "Talk To Me",
      href: `/user/${id}/contact`,
    },
  ];
  const randomInfo = { ...arr[0], username };

  return (
    <>
      <div className="fcfs w100 gap-6">
        <TopFeatures data={data} />
        <RandomInfoCard {...randomInfo} />
        <ButtonGroupUserSections data={sections} />
        {children}
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
