import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
} from "@/components";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

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
