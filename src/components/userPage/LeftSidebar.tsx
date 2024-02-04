import { ContactDetailsProps, UserProps } from "@/types/mongo/user.types";
import { ButtonBlue, ButtonConnect, ChipGroup, LightLine } from "..";
import ProductImg from "../project/ProjectImg";
import LeftMenuBottomBar from "./LeftMenuBottomBar";
import userAvatar from "@/lib/userAvatar";
import { PageProps } from "@/types/page.types";
import LeftSiderbarTopItem from "./LeftSiderbarTopItem";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";

const LeftSidebar = async ({
  username,
  bio,
  skills,
  contactMethod,
  contactMethodId,
  _id,
  ...rest
}: Partial<UserProps> & PageProps) => {
  const session: any = await getServerSessionForServer();
  const avatar = await userAvatar({ userProps: rest });
  return (
    <>
      <div
        id="leftMenuUser"
        className={`peer transition-[max-width] mt-6 md:mt-0 ease-in-out duration-300 fcfssb gap-3 md:left-0 md:top-[0px] cardGrad md:data-[state=active]:max-w-[314px] md:data-[state=not-active]:min-w-20 md:data-[state=not-active]:max-w-[88px] md:-z-[1] group/left md:fixed w100 md:h-screen  md:!border-r md:!border-b-0 md:!rounded-none `}
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
          <h1
            className={`md:group-data-[state=not-active]/left:text-sm text-[36px] !text-left `}
          >
            {username || "Username"}
          </h1>
          <p className="md:group-data-[state=not-active]/left:hidden">
            {bio || "I'm a full stack developer, I like to make things."}
          </p>
          <div className="frc md:group-data-[state=not-active]/left:flex-col w100 gap-2">
            {/* <ButtonBookmark
              className={`md:group-data-[state=not-active]/left:w-full md:group-data-[state=not-active]/left:justify-center`}
              style={{ height: 40 }}
              bookmarksCount={0}
            /> */}
            {session && session.user._id === _id ? (
              // <Link href="/project/new">Create Project</Link>
              <ButtonBlue href="/project/new" label={"Create Project"} />
            ) : (
              <ButtonConnect
                className={`userBtn md:group-data-[state=active]/left:h-10  md:group-data-[state=not-active]/left:h-15 gap-1 ${""}}`}
                style={{
                  padding: "0 10px",
                }}
                label={"Ask A Question"}
                contact={[
                  {
                    name: username,
                    contactMethod,
                    contactMethodId,
                  } as unknown as ContactDetailsProps,
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
        <LeftMenuBottomBar />
      </div>
    </>
  );
};

export default LeftSidebar;
