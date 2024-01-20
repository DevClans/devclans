import { ProjectProps } from "@/types/mongo/project.types";
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
  techStack,
  team,
  searchParams,
}: Partial<ProjectProps> & Partial<PageProps>) => {
  const teamNames = ["John", "Doe", "Jane", "Doe"];
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
            <p className="text-highlight">{needMembers || "Beginers"}</p>
          </div>
        }
        detailHeading="Team"
        detailDesc={teamNames.join(", ") || "team names"}
        chipArr={techStack || []}
        searchParams={searchParams}
        baseUrl={"/project/"}
        _id={_id?.toString() || ""}
        desc={
          desc ||
          "Some cool description about the group. Some cool description about the group."
        }
      />
    </>
  );
};

export default ProjectItem;
