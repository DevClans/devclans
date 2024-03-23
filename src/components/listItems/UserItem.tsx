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
  githubDetails,
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
    gitubImg: githubDetails?.avatar_url,
    discordSize: 512,
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
            <div className="fcfs w100 overflow-hidden">
              <div className="frcsb w100">
                <Link href={url}>
                  <h2>{displayName || username}</h2>
                </Link>
                <ProjectIconGroup
                  showLabels={false}
                  url={url}
                  message={msgSharingUser(displayName)}
                />
              </div>
              {username && (
                <p className="text-subH w100 text-ellipsis overflow-hidden">
                  @{username}
                </p>
              )}
            </div>
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
        baseUrl={""}
        _id={_id?.toString()}
        desc={bio || ""}
      />
    </>
  );
};

export default UserItem;
