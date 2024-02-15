import { UserSearchInfoProps } from "@/types/mongo/user.types";
import { ProjectIconGroup } from "..";
import ProductImg from "../project/ProjectImg";
import ItemsTemplate from "./ItemsTemplate";
import userAvatar from "@/lib/userAvatar";
import selectUserDisplayName from "@/lib/selectUserUsername";
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
  username: usernm,
  githubId,
  _id,
  searchParams,
}: UserSearchInfoProps & Partial<PageProps>) => {
  const {
    avatar: disAvatar,
    _id: disID,
    username: disUsername,
    global_name,
  } = discordDetails || {};
  const avtr = await userAvatar({
    avatar,
    discordImg: disAvatar,
    discordId: disID,
  });
  const displayName = selectUserDisplayName({
    username: usernm,
    discordUsername: global_name,
    userProps: { discordDetails },
  });
  const username = usernm || disUsername;
  const url = urlUser({ username: usernm, id: _id?.toString() });
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
            <Link href={url}>
              <h2>{displayName || "Username"}</h2>
            </Link>
            <ProjectIconGroup
              showLabels={false}
              url={url}
              message={msgSharingUser(displayName)}
            />
          </>
        }
        rightMessage={
          <p className="text-highlight font-medium">
            {/* TODO need to add some user info here */}
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
