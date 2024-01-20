import { ProjectProps } from "@/types/mongo/project.types";
import ProductImg from "../project/ProjectImg";
import {
  ButtonConnect,
  ButtonSecondary,
  ChipGroup,
  ProjectIconGroup,
  ProjectStage,
} from "..";
import Link from "next/link";

const ProjectItem = ({
  needMembers,
  imgs,
  _id,
  desc,
  title,
}: Partial<ProjectProps>) => {
  const teamNames = ["John", "Doe", "Jane", "Doe"];
  return (
    <>
      <div className="lg:frfssb fcc relative p-5 h-max min-h-[200px] gap-5 w100 card2">
        {/* IMAGE */}
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

        {/* DETAILS */}
        <div className="fcfs gap-2 w100">
          <div className="frcsb w100">
            <ProjectStage />
            <ProjectIconGroup
              showLabels={false}
              bookmarkCount={0}
              likesCount={0}
            />
          </div>
          <h2>{title || "Title"}</h2>
          <p>
            {desc ||
              "Some cool description about the group. Some cool description about the group."}
            {".."}
            <Link
              className="text-priDarker font-medium"
              href={"/project/" + _id}
            >
              {" "}
              Read More
            </Link>
          </p>
          {teamNames?.length > 0 && (
            <div className="frc gap-1">
              <p>Team</p>
              <p className="text-highlight font-medium">
                {teamNames.join(", ") || "team names"}
              </p>
            </div>
          )}
          <ChipGroup arr={["react", "nextjs", "typescript", "tailwindcss"]} />
        </div>
        {/* CONTACT AND CALL TO ACTIONS */}
        <div className="fcfssb h-full lg:min-h-[200px] lg:border-l border-t lg:border-t-0 pt-2 gap-2 lg:pt-0 border-border lg:pl-5 lg:max-w-[222px] w100 ">
          {/* need people */}
          <div className="frc gap-1">
            <p>Searching For :</p>
            <p className="text-highlight">{needMembers || "Beginers"}</p>
          </div>
          {/* buttons */}
          <div className="fcc w100 gap-2">
            <ButtonSecondary href={`project/${_id}`} label={"View Project"} />
            <ButtonConnect label={"Chat With Team"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
