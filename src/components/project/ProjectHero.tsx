import { ProjectStage, ProjectIconGroup, ChipGroup } from "@/components";
import ProductImg from "@/components/project/ProjectImg";
import { ProjectProps } from "@/types/mongo/project.types";
import { PageProps } from "@/types/page.types";

const ProjectHero = ({
  skills = ["react", "nextjs", "typescript", "tailwindcss"],
  imgs,
  devStage,
  title,
  likesCount,
  bookmarkCount,
  searchParams,
  desc,
}: ProjectProps & PageProps) => {
  const data = {
    title,
    desc,
  };
  return (
    <div className="card2 py-[30px] w100 fcfs gap-[30px] px-5">
      <div className="gap-5 fcfs w100">
        <div className="frcsb w100">
          <ProjectStage stage={devStage} />
          <ProjectIconGroup
            likesCount={likesCount}
            bookmarkCount={bookmarkCount}
          />
        </div>
        <h1 className="text-4xl">{data.title}</h1>
        <p>{data.desc}</p>
        {/* chips */}
        <ChipGroup
          arr={skills}
          searchParams={searchParams}
          baseUrl="/explore/projects"
        />
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
