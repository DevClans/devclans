import { UserSearchInfoProps } from "@/types/mongo/user.types";
import { ProjectIconGroup } from "..";
import ProductImg from "../project/ProjectImg";
import ItemsTemplate from "./ItemsTemplate";
import userAvatar from "@/lib/userAvatar";
import selectUserUsername from "@/lib/selectUserUsername";
import { PageProps } from "@/types/page.types";
import { msgSharingUser } from "@/lib/constants.messages";
import { urlUser } from "@/constants";

const UserItem = async ({
  avatar,
  bio,
  skills,
  discordDetails,
  githubDetails,
  skillLevel,
  username,
  _id,
  searchParams,
}: UserSearchInfoProps & Partial<PageProps>) => {
  const { avatar: disAvatar, _id: disID } = discordDetails || {};
  const { avatar_url: gitAvatar, bio: gitBio, login } = githubDetails || {};
  const avtr = await userAvatar({
    avatar,
    discordImg: disAvatar,
    gitubImg: gitAvatar,
    discordId: disID,
  });
  const usernm = selectUserUsername({
    username,
    userProps: { discordDetails, githubDetails },
  });

  return (
    <>
      <ItemsTemplate
        searchParams={searchParams}
        img={
          <div className="lg:max-w-[335px] min-h-[200px] relative w-full">
            <ProductImg
              src={avtr}
              alt={username}
              fill={true}
              // isAvatar={true}
              className="w-full h-full"
              style={{
                // aspectRatio: "425/255",
                objectFit: "cover",
              }}
            />
          </div>
        }
        detailsHeader={
          <>
            <h2>{usernm || "Username"}</h2>
            <ProjectIconGroup
              showLabels={false}
              url={urlUser(_id)}
              message={msgSharingUser(usernm)}
            />
          </>
        }
        rightMessage={
          <p className="text-highlight font-medium">
            You can remember by my name
          </p>
        }
        detailHeading={"Skill Level"}
        detailDesc={skillLevel as string}
        chipArr={skills}
        baseUrl={"/user/"}
        _id={_id?.toString()}
        desc={bio || gitBio || ""}
      />
    </>
  );
};

export default UserItem;
