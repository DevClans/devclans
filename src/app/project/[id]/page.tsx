import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
  ProjectData,
} from "@/components";
import { FetchProjectProps } from "@/types/fetch.types";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const {
    projectData,
    renderLanguages,
  }: { projectData: FetchProjectProps | null; renderLanguages: any } =
    await ProjectData(id);
  if (!projectData) {
    return <>No Project Found With Id {id}</>;
  }
  const { data, files, languages } = projectData as FetchProjectProps;
  if (!data) {
    return <>No data Found With Id {id}</>;
  }
  console.log("data for id", id, "=> ", data);
  return (
    <>
      <LightLine />
      <div className=" p-[30px] gap-[30px] frfssb w100">
        <div className="w100 fcc gap-[30px]">
          <ProjectHero {...data} />
          <AboutTheRepo {...files} />
          <ProjectDetails />
        </div>
        {/* sidebar */}
        <ProjectSidebar />
      </div>
    </>
  );
};

export default page;
