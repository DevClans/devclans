"use client";
import { ArrowLeftRounded, ArrowRightAltRounded } from "@mui/icons-material";
import { IconGithub, IconTwitter, LightLine, MuiIconButton } from "..";
const LeftMenuBottomBar = () => {
  const toogleActive = () => {
    const leftMenu = document.getElementById("leftMenuUser");
    const userBtn = document.getElementsByClassName("userBtn")[0];
    if (leftMenu) {
      if (userBtn) {
        if (leftMenu.getAttribute("data-state") == "active") {
          // set userBtn to change text to "Talk"
          const a = userBtn.innerHTML.split("Question");
          userBtn.innerHTML = "Ask" + a[1];
        } else {
          // set userBtn to change text to "Ask A Question"
          const a = userBtn.innerHTML.split("Ask");
          userBtn.innerHTML = "Ask A Question" + a[1];
        }
      }
      leftMenu.getAttribute("data-state") == "active"
        ? leftMenu.setAttribute("data-state", "not-active")
        : leftMenu.setAttribute("data-state", "active");
    }
  };
  return (
    <>
      <div className="fcfs w100 gap-2 group-data-[state=not-active]/left:px-2">
        <LightLine />
        <div className="frcsb group-data-[state=not-active]/left:flex-col gap-2 w100 ">
          <div className="frc h-full group-data-[state=active]/left:ml-4 gap-3 w100 group-data-[state=active]/left:border-r group-data-[state=not-active]/left:border-b group-data-[state=not-active]/left:pb-4 border-border group-data-[state=not-active]/left:flex-col">
            <IconGithub />
            <IconTwitter className="" />
          </div>
          <MuiIconButton
            className="text-text group-data-[state=not-active]/left:w-full group-data-[state=active]/left:mr-2"
            onClick={() => {
              toogleActive();
            }}
          >
            <ArrowRightAltRounded
              fontSize="medium"
              className={`group-data-[state=active]/left:hidden`}
            />
            <ArrowLeftRounded
              fontSize="medium"
              className={`group-data-[state=not-active]/left:hidden`}
            />
          </MuiIconButton>
        </div>
      </div>
    </>
  );
};

export default LeftMenuBottomBar;