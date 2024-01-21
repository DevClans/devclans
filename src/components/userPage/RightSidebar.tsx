import {
  LookingForMembers,
  ProjectDetails,
  ProjectDetailsItem,
  ToggleListItem,
} from "..";

const RightSidebar = () => {
  return (
    <>
      <div className="fcc gap-6 max-h-[84vh]">
        <LookingForMembers />
        <ProjectDetails
          heading={""}
          className="h-full"
          data={[
            {
              heading: "The Problem We Solve",
              headingClass: "text-heading text-sm font-semibold",
              data: [
                {
                  heading: "Hello",
                  data: [{ title: "Hello", desc: "Hello" }],
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default RightSidebar;
