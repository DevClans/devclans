import { UserProps } from "@/types/mongo/user.types";
import { ProjectIconGroup } from "..";
import ProductImg from "../project/ProjectImg";
import ItemsTemplate from "./ItemsTemplate";
import userAvatar from "@/lib/userAvatar";
import selectUserUsername from "@/lib/selectUserUsername";
import { PageProps } from "@/types/page.types";

const UserItem = ({
  avatar,
  bio,
  skills,
  discordDetails,
  githubDetails,
  skillLevel,
  username,
  _id,
  searchParams,
}: UserProps & Partial<PageProps>) => {
  const { username: discordUsername, avatar: disAvatar } = discordDetails || {};
  const {
    avatar_url: gitAvatar,
    bio: gitBio,
    username: gitUsername,
    login,
  } = githubDetails || {};
  const avtr = userAvatar({
    avatar,
    discordImg: disAvatar,
    gitubImg: gitAvatar,
  });
  const usernm = selectUserUsername({ username, discordUsername, gitUsername });

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
            <ProjectIconGroup showLabels={false} />
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
        _id={_id.toString()}
        desc={bio || gitBio || ""}
      />
    </>
  );
};

export default UserItem;
