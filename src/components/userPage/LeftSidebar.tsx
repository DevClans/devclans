import { ContactDetailsProps, UserProps } from "@/types/mongo/user.types";
import { ButtonConnect, ChipGroup, LightLine } from "..";
import ProductImg from "../project/ProjectImg";
import LeftMenuBottomBar from "./LeftMenuBottomBar";
import userAvatar from "@/lib/userAvatar";

const LeftSidebar = ({
  username,
  bio,
  skills,
  contactMethod,
  contactMethodId,
  ...rest
}: Partial<UserProps>) => {
  const avatar = userAvatar({ userProps: rest });
  return (
    <>
      <div
        id="leftMenuUser"
        className={`peer transition-[max-width] ease-in-out duration-300 fcfssb gap-3 left-0 top-[0px] pt-20 cardGrad data-[state=active]:max-w-[314px] data-[state=not-active]:min-w-20 data-[state=not-active]:max-w-[88px] -z-[1] group/left`}
        data-state="active"
        style={{
          height: "100vh",
          position: "fixed",
          boxSizing: "border-box",
          borderWidth: 0,
          borderRightWidth: 1,
          borderLeftWidth: 0,
          borderRadius: 0,
        }}
      >
        <div
          className="fcfs group-data-[state=active]/left:px-6 gap-3 h-full p-3 overflow-hidden w-full"
          style={{
            boxSizing: "border-box",
          }}
        >
          <div className="group-data-[state=not-active]/left:h-[50px] h-[200px] w100 relative">
            <ProductImg
              src={avatar}
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
            className={`group-data-[state=not-active]/left:text-sm text-[36px] `}
          >
            {username || "Damian"}
          </h1>
          <p className="group-data-[state=not-active]/left:hidden">
            {bio || "I'm a full stack developer, I like to make things."}
          </p>
          <div className="frc group-data-[state=not-active]/left:flex-col w100 gap-2">
            {/* <ButtonBookmark
              className={`group-data-[state=not-active]/left:w-full group-data-[state=not-active]/left:justify-center`}
              style={{ height: 40 }}
              bookmarksCount={0}
            /> */}
            <ButtonConnect
              className={`userBtn group-data-[state=active]/left:h-10  group-data-[state=not-active]/left:h-15 gap-1 ${""}}`}
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
          </div>
          {Array.isArray(skills) && skills.length > 0 && (
            <>
              <LightLine className="group-data-[state=not-active]/left:hidden" />
              <ChipGroup
                className={`group-data-[state=not-active]/left:hidden`}
                arr={skills}
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
