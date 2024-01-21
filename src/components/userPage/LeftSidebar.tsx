import { ButtonBookmark, ButtonConnect, ChipGroup, LightLine } from "..";
import ProductImg from "../project/ProjectImg";
import LeftMenuBottomBar from "./LeftMenuBottomBar";

const LeftSidebar = ({
  username,
  desc,
}: {
  username: string;
  desc: string;
}) => {
  const isActive = "group-data-[state=active]/left:";
  return (
    <>
      <div
        id="leftMenuUser"
        className={`fcfssb gap-3 left-0 top-[0px] pt-20 gradCard data-[state=active]:max-w-[314px] data-[state=not-active]:min-w-20 data-[state=not-active]:max-w-[88px] -z-20 group/left`}
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
          className="fcfs group-data-[state=active]/left:px-6 gap-3 h-full p-3 "
          style={{
            boxSizing: "border-box",
          }}
        >
          <div className="group-data-[state=not-active]/left:h-[50px] h-[200px] w100 relative">
            <ProductImg
              src="/homeHero.png"
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
            className={`group-data-[state=not-active]/left:text-sm text-[36px]`}
          >
            {username || "Damian"}
          </h1>
          <p className="group-data-[state=not-active]/left:hidden">
            {desc || "I'm a full stack developer, I like to make things."}
          </p>
          <div className="frc group-data-[state=not-active]/left:flex-col w100 gap-2">
            <ButtonBookmark
              className={`group-data-[state=not-active]/left:w-full group-data-[state=not-active]/left:justify-center`}
              style={{ height: 40 }}
              bookmarksCount={0}
            />
            <ButtonConnect
              className={`before:content-['Ask'] group-data-[state=active]/left:h-10  group-data-[state=not-active]/left:h-15 gap-1 ${""}}`}
              style={{
                padding: "0 10px",
              }}
              label={" "}
            />
          </div>
          <LightLine className="group-data-[state=not-active]/left:hidden" />
          <ChipGroup
            className={`group-data-[state=not-active]/left:hidden`}
            arr={["chip", "chip"]}
          />
        </div>
        <LeftMenuBottomBar />
      </div>
    </>
  );
};

export default LeftSidebar;
