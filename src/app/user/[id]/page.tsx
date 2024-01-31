import LeftSidebar from "@/components/userPage/LeftSidebar";
import MiddleSection from "@/components/userPage/MiddleSection";
import RightSidebar from "@/components/userPage/RightSidebar";
import UserOverview from "@/components/userPage/UserOverview";
import UserProjects from "@/components/userPage/UserProjects";
import selectUserUsername from "@/lib/selectUserUsername";
import userQuestions from "@/lib/userQuestions";
import { InfoWithIconProps } from "@/types/list.types";
import type { UserProps } from "@/types/mongo/user.types";
import type { PageProps } from "@/types/page.types";
import type {
  ProjectDetailsItemProps,
  ToogleListItemProps,
} from "@/types/toggleList.types";
import { Fetch } from "@/utils/fetchApi";

type UserPageProps = {
  params: { id: string };
  searchParams: { tab: string };
};

const page = async ({ params, searchParams }: UserPageProps) => {
  const { id } = params;
  const tab: string = (searchParams?.tab as string) || "overview";
  const userData: UserProps = await Fetch({
    endpoint: `/user/${id}`,
  });
  console.log("user data", userData);
  if (
    !userData ||
    (userData && ("error" in userData || "message" in userData))
  ) {
    return <div>user not found</div>;
  }
  const questions = userData.questions;
  const arr = userQuestions({ questions });
  const username = selectUserUsername({ userProps: userData });
  const convertInfoToProjectDetails = (
    infoItems: InfoWithIconProps[]
  ): ProjectDetailsItemProps[] => {
    return infoItems.map((infoItem) => {
      // If the item has a question (InfoWithIconProps), create a ToogleListItemProps
      if (infoItem.question) {
        const toogleListItem: ToogleListItemProps = {
          heading: infoItem.question,
          data: [
            {
              // title: infoItem.title,
              desc: infoItem.desc,
            },
          ],
        };

        return {
          // heading: infoItem.title,
          data: [toogleListItem],
        };
      }

      // If the item does not have a question, create a regular ProjectDetailsItemProps
      return {
        data: infoItem.desc,
      };
    });
  };
  const test = convertInfoToProjectDetails(arr);
  const ele: { [key: string]: JSX.Element } = {
    overview: <UserOverview data={test} />,
    projects: (
      <UserProjects
        ownedProjects={
          userData["ownedProjects"]?.length > 0 &&
          typeof userData["ownedProjects"] == "object"
            ? (userData["ownedProjects"] as any)
            : []
        }
        contributedProjects={
          userData["contributedProjects"]?.length > 0 &&
          typeof userData["contributedProjects"] == "object"
            ? (userData["contributedProjects"] as any)
            : []
        }
      />
    ),
    // experience: <UserExperience />,
  };
  return (
    <>
      <LeftSidebar {...userData} searchParams={searchParams} />
      <Common
        username={username}
        questions={userData["questions"]}
        params={params}
        searchParams={searchParams}
      >
        {ele[tab] || (
          <div className={"card2 w100 p-5 !rounded-[10px]"}>
            <p>No data found</p>
          </div>
        )}
      </Common>
    </>
  );
};

export default page;

const Common = ({
  children,
  params,
  username,
  questions,
  searchParams,
}: PageProps & {
  username: UserProps["username"];
  questions: UserProps["questions"];
} & React.PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center  lg:flex-row lg:items-start lg:justify-between md:peer-data-[state=active]:pl-[300px] md:peer-data-[state=not-active]:pl-[80px] lg:peer-data-[state=not-active]:pl-[90px] lg:peer-data-[state=active]:pl-[310px] relative md:-z-10 w100 md:py-6 gap-6">
      {/* middle scroll */}
      <MiddleSection
        params={params}
        username={username || ""}
        questions={questions}
        searchParams={searchParams}
      >
        {children}
      </MiddleSection>
      {/* right sidebar */}
      <RightSidebar />
    </div>
  );
};
