import FormNewUser from "@/components/FormNewUser";
import CreateNewProject from "@/components/userPage/CreateNewProject";
import LeftSidebar from "@/components/userPage/LeftSidebar";
import MiddleSection from "@/components/userPage/MiddleSection";
import RightSidebar from "@/components/userPage/RightSidebar";
import UserOverview from "@/components/userPage/UserOverview";
import UserProjects from "@/components/userPage/UserProjects";
import selectUserDisplayName from "@/lib/selectUserUsername";
import userQuestions from "@/lib/userQuestions";
import { InfoWithIconProps } from "@/types/list.types";
import type {
  LookingForMembersProps,
  UserFormProps,
  UserProps,
} from "@/types/mongo/user.types";
import type { PageProps } from "@/types/page.types";
import type {
  ProjectDetailsItemProps,
  ToogleListItemProps,
} from "@/types/toggleList.types";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { Fetch } from "@/utils/fetchApi";
import { userSchema } from "@/zod/zod.common";

type UserPageProps = {
  params: { id: string };
  searchParams: { tab?: string; mode?: string };
};

const page = async ({ params, searchParams }: UserPageProps) => {
  const { id } = params; // this is can be username or mongo id now
  const tab: string = (searchParams?.tab as string) || "overview";
  const mode: string = searchParams?.mode as string;
  const userData: UserProps = await Fetch({
    endpoint: `/user/${id}`,
  });
  console.log("user data", Boolean(userData));
  if (
    !userData ||
    (userData && ("error" in userData || "message" in userData))
  ) {
    return <div>user not found</div>;
  }

  const session: any = await getServerSessionForServer();
  console.log("mode", mode, session?.user?._id, userData._id);
  if (mode == "edit") {
    if (session?.user?._id == userData._id) {
      const data = userSchema.partial().safeParse(userData);
      return (
        // ! here it can be a problem as we are using userData directly
        <FormNewUser
          defaultValues={
            data.success ? (data.data as UserFormProps) : (userData as any)
          }
        />
      );
    } else {
      console.error("You are not authorized to edit this user");
    }
  }

  const questions = userData.questions;
  const arr = userQuestions({ questions });
  const username = userData.username || userData.discordDetails?.username;
  const displayName = selectUserDisplayName({ userProps: userData });
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
    overview: (
      <UserOverview
        data={test}
        username={username}
        githubDetails={userData["githubDetails"]}
      />
    ),
    projects: (
      <>
        <CreateNewProject />
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
      </>
    ),
    // experience: <UserExperience />,
  };
  return (
    <>
      <LeftSidebar
        {...userData}
        username={username}
        searchParams={searchParams}
      />
      <Common
        level={userData["skillLevel"]}
        params={params}
        searchParams={searchParams}
        {...userData}
        username={username}
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
  level,
  _id,
}: PageProps & {
  username: UserProps["username"];
  questions: UserProps["questions"];
} & React.PropsWithChildren &
  LookingForMembersProps) => {
  return (
    <div
      className="flex flex-col items-center  
    xl:flex-row 
    lg:items-start lg:justify-between md:peer-data-[state=active]:pl-[300px] md:peer-data-[state=not-active]:pl-[80px] lg:peer-data-[state=not-active]:pl-[90px] lg:peer-data-[state=active]:pl-[310px] relative md:-z-10 w100 md:pt-6 pb-6 gap-6"
    >
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
      <RightSidebar _id={_id} username={username} level={level} />
    </div>
  );
};
