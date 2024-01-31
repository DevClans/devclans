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
  searchParams,
}: {
  questions: UserQuestionsProps;
  username: string;
} & React.PropsWithChildren &
  PageProps) => {
  const tab = (searchParams?.tab as string) || "overview";
  const id = params?.id;
  const arr = userQuestions({ questions });
  const data = arr.length > 2 ? arr.slice(0, 2) : [];
  const hrefFun = (tab: string) => `/user/${id}${tab ? `?tab=${tab}` : ""}`;
  const sections: ButtonProps[] = [
    {
      label: "Overview",
      activeLabel: "Learn About Me",
      href: hrefFun("overview"),
    },
    {
      label: "Projects",
      activeLabel: "See My Projects",
      href: hrefFun("projects"),
    },
    // {
    //   label: "Experience",
    //   activeLabel: "See My Experience",
    //   href: hrefFun("experience"),
    // },
    // {
    //   label: "Education",
    //   activeLabel: "See My Education",
    //   href: hrefFun("education"),
    // },
    // {
    //   label: "Contact",
    //   activeLabel: "Talk To Me",
    //   href: hrefFun("contact"),
    // },
  ];
  const randomInfo = { ...arr[0], username };

  return (
    <>
      <div className="fcfs w100 gap-6">
        <TopFeatures data={data} />
        <RandomInfoCard {...randomInfo} />
        <ButtonGroupUserSections active={tab} data={sections} />
        {children}
      </div>
    </>
  );
};

export default MiddleSection;

const TopFeatures = ({ data }: { data: InfoWithIconProps[] }) => {
  return (
    <>
      <div className="flex lg:flex-row items-center flex-col  w100 gap-x-6 gap-y-3">
        {data.map((item, i) => (
          <InfoWithIcons key={i} {...item} />
        ))}
      </div>
    </>
  );
};
