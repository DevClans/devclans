import { UserSearchInfoProps } from "@/types/mongo/user.types";
import { ProjectIconGroup } from "..";
import ProductImg from "../project/ProjectImg";
import ItemsTemplate from "./ItemsTemplate";
import userAvatar from "@/lib/userAvatar";
import selectUserUsername from "@/lib/selectUserUsername";
import { PageProps } from "@/types/page.types";
import { msgSharingUser } from "@/lib/constants.messages";
import { urlUser } from "@/constants";
import Link from "next/link";

const UserItem = async ({
  avatar,
  bio,
  skills,
  discordDetails,
  skillLevel,
  username,
  githubId,
  _id,
  searchParams,
}: UserSearchInfoProps & Partial<PageProps>) => {
  const { avatar: disAvatar, _id: disID } = discordDetails || {};
  const avtr = await userAvatar({
    avatar,
    discordImg: disAvatar,
    discordId: disID,
  });
  const usernm = selectUserUsername({
    username,
    gitUsername: githubId,
    userProps: { discordDetails },
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
              isUser={true}
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
            <Link href={urlUser(_id)}>
              <h2>{usernm || "Username"}</h2>
            </Link>
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
        desc={bio || ""}
      />
    </>
  );
};

export default UserItem;
