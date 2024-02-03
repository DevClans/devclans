import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import ProductImg from "../project/ProjectImg";
import { ProjectIconGroup, ProjectStage } from "..";
import ItemsTemplate from "./ItemsTemplate";
import { PageProps } from "@/types/page.types";
import { urlProject } from "@/constants";
import { msgSharingProject } from "@/lib/constants.messages";

const ProjectItem = ({
  needMembers,
  imgs,
  _id,
  title,
  skills,
  team,
  ...rest
}: ProjectSearchItemProps & Partial<PageProps>) => {
  const teamNames = team?.map((t) => t.username) || [];
  return (
    <>
      <ItemsTemplate
        img={
          <div className="lg:max-w-[335px] min-h-[200px] relative w-full">
            <ProductImg
              src={(imgs?.[0] && imgs[0]) || "/homeHero.png"}
              // width={335}
              // height={200}
              fill={true}
              style={{
                // aspectRatio: "425/255",
                objectFit: "cover",
              }}
            />
          </div>
        }
        title={title || "Project Title"}
        detailsHeader={
          <>
            <ProjectStage />
            <ProjectIconGroup
              url={urlProject(_id)}
              message={msgSharingProject(title || "")}
              showLabels={false}
              bookmarkCount={0}
              likesCount={0}
              _id={_id}
            />
          </>
        }
        rightMessage={
          <div className="frc gap-1">
            <p>Searching For :</p>
            <p className="text-highlight capitalize">
              {needMembers || "Beginers"}
            </p>
          </div>
        }
        detailHeading="Team"
        detailDesc={teamNames.join(", ")}
        chipArr={skills || []}
        baseUrl={"/project"}
        _id={_id?.toString() || ""}
        {...rest}
      />
    </>
  );
};

export default ProjectItem;
