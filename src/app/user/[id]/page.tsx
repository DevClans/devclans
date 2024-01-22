import UserOverview from "@/components/userPage/UserOverview";
import userQuestions from "@/lib/userQuestions";
import { InfoWithIconProps } from "@/types/list.types";
import { UserProps } from "@/types/mongo/user.types";
import {
  ProjectDetailsItemProps,
  ToogleListItemProps,
} from "@/types/toggleList.types";
import { Fetch } from "@/utils/fetchApi";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
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
  return (
    <>
      <UserOverview data={test} />
    </>
  );
};

export default page;
