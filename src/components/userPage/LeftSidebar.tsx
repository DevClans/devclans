import { ContactDetailsProps, UserProps } from "@/types/mongo/user.types";
import { ButtonConnect, ButtonSecondary, ChipGroup, LightLine } from "..";
import ProductImg from "../project/ProjectImg";
import LeftMenuBottomBar from "./LeftMenuBottomBar";
import userAvatar from "@/lib/userAvatar";
import { PageProps } from "@/types/page.types";
import LeftSiderbarTopItem from "./LeftSiderbarTopItem";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { editProfile } from "@/paths";

const LeftSidebar = async ({
  username,
  bio,
  skills,
  contactMethod,
  contactMethodId,
  _id,
  displayName,
  socials,
  ...rest
}: Partial<UserProps> & PageProps & { displayName: string }) => {
  const session: any = await getServerSessionForServer();
  const avatar = await userAvatar({ userProps: rest });
  return (
    <>
      <div
        id="leftMenuUser"
        className={`peer transition-[max-width] mt-6 md:mt-0 ease-in-out duration-300 flex-col items-start flex justify-normal md:justify-between gap-3 md:left-0 md:top-[0px] cardGrad md:data-[state=active]:max-w-[314px] md:data-[state=not-active]:min-w-20 md:data-[state=not-active]:max-w-[88px] md:-z-[1] group/left md:fixed w100 md:h-screen md:!border-r md:!border-b-0 md:!rounded-none `}
        data-state="active"
        style={{
          boxSizing: "border-box",
        }}
      >
        <LeftSiderbarTopItem />
        <div
          className="fcfs md:group-data-[state=active]/left:px-6 gap-3 h-full p-3 overflow-hidden w-full"
          style={{
            boxSizing: "border-box",
          }}
        >
          <div className="md:group-data-[state=not-active]/left:h-[50px] h-[200px] w100 relative">
            <ProductImg
              src={avatar}
              isUser={true}
              fill={true}
              className={``}
              style={{
                alignSelf: "center",
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="fcfs w100 overflow-hidden">
            <h1
              className={`md:group-data-[state=not-active]/left:text-sm text-[36px] !text-left text-ellipsis overflow-hidden`}
            >
              {displayName || username}
            </h1>
            {username && (
              <p className="text-subH md:group-data-[state=not-active]/left:hidden  w100 text-ellipsis overflow-hidden">
                {username}
              </p>
            )}
          </div>
          {bio && (
            <p className="md:group-data-[state=not-active]/left:hidden">
              {bio}
            </p>
          )}
          <div className="frc md:group-data-[state=not-active]/left:flex-col w100 gap-2">
            {/* <ButtonBookmark
              className={`md:group-data-[state=not-active]/left:w-full md:group-data-[state=not-active]/left:justify-center`}
              style={{ height: 40 }}
              bookmarksCount={0}
            /> */}
            {session && session.user._id === _id ? (
              // <Link href="/project/new">Create Project</Link>
              <ButtonSecondary
                disabled={session && session.user._id !== _id}
                href={editProfile(_id)}
                className="text-center"
                label={"Edit Profile"}
              />
            ) : (
              <ButtonConnect
                className={`userBtn md:group-data-[state=active]/left:h-10  md:group-data-[state=not-active]/left:h-15 gap-1 ${""}}`}
                style={{
                  padding: "0 10px",
                }}
                label={"Ask A Question"}
                contact={[
                  {
                    name: username || displayName,
                    contactMethod: contactMethod,
                    contactId: contactMethodId || (rest?.discordId as string),
                  },
                ]}
              />
            )}
          </div>
          {Array.isArray(skills) && skills.length > 0 && (
            <>
              <LightLine className="md:group-data-[state=not-active]/left:hidden" />
              <ChipGroup
                className={`md:group-data-[state=not-active]/left:hidden`}
                arr={skills}
                searchParams={rest?.searchParams}
                baseUrl="/explore/users"
              />
            </>
          )}
        </div>
        <LeftMenuBottomBar links={Object.entries(socials || {})} />
      </div>
    </>
  );
};

export default LeftSidebar;
