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
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { urlBase } from "@/constants";

type UserPageProps = {
  params: { id: string };
  searchParams: { tab?: string; mode?: string };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params?.id;
  const user: UserProps | null = await Fetch({
    endpoint: `/user/${id}`,
  });
  const { username: title, bio, domain, skills, discordDetails } = user || {};
  const titleIs = `@${title}`;
  const previousImages = (await parent).openGraph?.images || [];
  const keywords = [titleIs, ...(skills || [])].slice(0, 10);
  if (domain) {
    keywords.push(domain);
  }
  if (discordDetails?.global_name) {
    keywords.push(discordDetails.global_name);
  }
  // add some common keywords
  Array.prototype.push.apply(keywords, ["user", "profile", "devclans"]);
  return {
    title: titleIs,
    description: bio,
    keywords,
    openGraph: {
      title: titleIs,
      description: bio,
      url: `${urlBase}/${title}`,
      images: previousImages,
    },
    twitter: {
      title: titleIs,
      description: bio,
    },
  };
}

const page = async ({ params, searchParams }: UserPageProps) => {
  const session: any = await getServerSessionForServer();
  const { id } = params; // this is can be username or mongo id now
  const tab: string = (searchParams?.tab as string) || "overview";
  const mode: string = searchParams?.mode as string;
  const userData: UserProps = await Fetch({
    endpoint: `/user/${id}`,
    revalidate: session?.user?._id == id && 0,
    // cache: session?.user?._id == id ? "no-store" : undefined,
  });
  console.log("user data", userData);
  if (
    !userData ||
    (userData && ("error" in userData || "message" in userData))
  ) {
    return notFound();
  }

  console.log("mode", mode, session?.user?._id, userData._id);
  if (mode == "edit") {
    if (session?.user?._id == userData._id) {
      const data = userSchema.partial().safeParse(userData);
      console.log(
        "data",
        data.success ? (data.data as UserFormProps) : userData
      );
      return (
        // ! here it can be a problem as we are using userData directly
        <FormNewUser
          defaultValues={data.success ? (data.data as UserFormProps) : userData}
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
        _id={userData._id}
        data={test}
        username={displayName || username}
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
        displayName={displayName}
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
        displayName={displayName}
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
  displayName,
  _id,
}: PageProps & {
  username: UserProps["username"];
  questions: UserProps["questions"];
  displayName: string;
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
        username={displayName || username}
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
