import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
  ProjectData,
} from "@/components";
import { FetchProjectProps } from "@/types/fetch.types";
import { UserTeamItemProps } from "@/types/mongo/user.types";
import { PageProps } from "@/types/page.types";
import { convertProjectDetails } from "@/utils/convertProjectDetails";

const Page = async ({
  params,
  searchParams,
}: { params: { id: string } } & PageProps) => {
  const id = params.id;
  const {
    projectData,
    renderLanguages,
  }: { projectData: FetchProjectProps | null; renderLanguages: any } =
    await ProjectData(id);
  const { data, files, languages } = (projectData as FetchProjectProps) || {};
  // console.log("data for id", id, "=> ", data);
  const convertedProjectDetails = convertProjectDetails(data?.projectDetails);
  if (!data) {
    return <>No data Found With Id {id}</>;
  }
  return (
    <>
      <LightLine />
      <div className=" p-[30px] gap-[30px] frfssb w100">
        <div className="w100 fcc gap-[30px]">
          <ProjectHero {...data} params={params} searchParams={searchParams} />
          <AboutTheRepo {...files} />
          {convertedProjectDetails && (
            <ProjectDetails data={convertedProjectDetails} />
          )}
        </div>
        {/* sidebar */}
        <ProjectSidebar team={data.team as UserTeamItemProps[]} />
      </div>
    </>
  );
};

export default Page;
