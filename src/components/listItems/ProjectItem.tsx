import { ProjectSearchItemProps } from "@/types/mongo/project.types";
import ProductImg from "../project/ProjectImg";
import { ProjectIconGroup, ProjectStage } from "..";
import ItemsTemplate from "./ItemsTemplate";
import { PageProps } from "@/types/page.types";

const ProjectItem = ({
  needMembers,
  imgs,
  _id,
  desc,
  title,
  skills,
  team,
  searchParams,
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
              showLabels={false}
              bookmarkCount={0}
              likesCount={0}
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
        searchParams={searchParams}
        baseUrl={"/project"}
        _id={_id?.toString() || ""}
        desc={desc}
      />
    </>
  );
};

export default ProjectItem;
