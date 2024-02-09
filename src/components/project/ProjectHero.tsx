import { ProjectStage, ProjectIconGroup, ChipGroup } from "@/components";
import ProductImg from "@/components/project/ProjectImg";
import { urlProject } from "@/constants";
import { msgSharingProject } from "@/lib/constants.messages";
import {
  ProjectProps,
  ProjectRepoDetailsProps,
} from "@/types/mongo/project.types";
import { PageProps } from "@/types/page.types";
import ProjectRepoDetails from "./ProjectRepoDetails";

const ProjectHero = ({
  skills = ["react", "nextjs", "typescript", "tailwindcss"],
  imgs,
  devStage,
  title,
  _id,
  likesCount,
  bookmarkCount,
  searchParams,
  desc,
  repoDetails,
  repoName,
}: Omit<ProjectProps, "repoDetails"> &
  PageProps & {
    repoDetails: Partial<ProjectRepoDetailsProps>;
  }) => {
  const data = {
    title,
    desc,
    _id,
  };
  return (
    <div className="card2 py-[30px] w100 fcfs gap-[30px] px-5">
      <div className="gap-5 fcfs w100">
        <div className="frcsb w100">
          <ProjectStage stage={devStage} />
          <ProjectIconGroup
            url={urlProject(_id)}
            message={msgSharingProject(title || "")}
            likesCount={likesCount}
            bookmarkCount={bookmarkCount}
            _id={data._id}
          />
        </div>
        <div className="frfssb w100 flex-wrap">
          <div className="fcfs gap-5">
            <h1 className="text-4xl text-left ">{data.title}</h1>
            <p>{data.desc}</p>
            {/* chips */}
            <ChipGroup
              arr={skills}
              searchParams={searchParams}
              baseUrl="/explore/projects"
            />
          </div>
          <ProjectRepoDetails repoName={repoName} {...repoDetails} />
        </div>
      </div>
      {/* images */}
      <div className="relative w100">
        <div className="frc gap-2 w100 scrollbar">
          {imgs?.map((img, i) => (
            <ProductImg key={i} src={img} />
          ))}
        </div>
        <div
          className="absolute top-0 h-full w-1/12 right-0 z-10 "
          style={{
            background:
              " linear-gradient(271deg, rgba(2, 11, 28, 0.85) 4.7%, rgba(217, 217, 217, 0.00) 99.35%)",
          }}
        />
      </div>
    </div>
  );
};

export default ProjectHero;
