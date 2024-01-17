import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
  ProjectData,
} from "@/components";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await ProjectData(id);
  console.log(data);
  return (
    <>
      <LightLine />
      <div className=" p-[30px] gap-[30px] frfssb w100">
        <div className="w100 fcc gap-[30px]">
          <ProjectHero />
          <AboutTheRepo />
          <ProjectDetails />
        </div>
        {/* sidebar */}
        <ProjectSidebar />
      </div>
    </>
  );
};

export default page;
