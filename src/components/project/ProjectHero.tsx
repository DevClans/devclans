import {
  BookmarkBorderOutlined,
  ButtonIcon,
  Chip,
  ProjectStage,
  IosShareRounded,
  ButtonLike,
} from "@/components";
import ProductImg from "@/components/project/ProjectImg";
import { ImageProps } from "@/types";

const ProjectHero = () => {
  const data = {
    title: "Project Title",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  };
  const imgs: ImageProps[] = [
    {
      src: "/homeHero.png",
      alt: "project",
      height: 255,
      width: 428,
    },
    {
      src: "/homeHero.png",
      alt: "project",
      height: 255,
      width: 428,
    },
    {
      src: "/homeHero.png",
      alt: "project",
      height: 255,
      width: 428,
    },
  ];
  const techStack = ["react", "nextjs", "typescript", "tailwindcss"];
  return (
    <div className="card2 py-[30px] w100 fcfs gap-[30px] px-5">
      <div className="gap-5 fcfs w100">
        <div className="frcsb w100">
          <ProjectStage />
          <div className="frc gap-[10px]">
            <ButtonIcon
              label="share"
              icon={<IosShareRounded fontSize="small" />}
            />
            <ButtonIcon
              label={0}
              icon={<BookmarkBorderOutlined fontSize="small" />}
            />
            <ButtonLike />
          </div>
        </div>
        <h1 className="text-4xl">{data.title}</h1>
        <p>{data.desc}</p>
        {/* chips */}
        <div className="frc flex-wrap">
          {techStack.map((tech, i) => (
            <Chip key={i} label={tech} />
          ))}
        </div>
      </div>
      {/* images */}
      <div className="relative">
        <div className="frc gap-2 w100 scrollbar">
          {imgs.map((img, i) => (
            <ProductImg key={i} {...img} />
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
