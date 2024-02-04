import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
  ProjectData,
} from "@/components";
import { selectIconForLinks } from "@/lib/socialIcons";
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
    projectData: data,
    renderLanguages,
  }: { projectData: FetchProjectProps["data"] | null; renderLanguages: any } =
    await ProjectData(id);
  console.log("data for id", id, "=> ", data);
  if (!data) {
    return <>No data Found With Id {id}</>;
  }
  const convertedProjectDetails = convertProjectDetails(data?.projectDetails);
  const files = {
    readme: data?.repoDetails?.readme || "",
    contributing: data?.repoDetails?.contributing || "",
  };
  return (
    <>
      <LightLine />
      <div className="container p-[30px] gap-[30px] flex flex-col items-center  lg:flex-row lg:items-start lg:justify-between w100">
        <div className="w100 fcc gap-[30px]">
          <ProjectHero {...data} params={params} searchParams={searchParams} />
          <AboutTheRepo {...files} />
          {convertedProjectDetails && (
            <ProjectDetails data={convertedProjectDetails} />
          )}
        </div>
        {/* sidebar */}
        <ProjectSidebar
          links={data.projectLinks}
          contact={(data.team as UserTeamItemProps[]).map((item) => {
            return {
              name: item.username || "Username",
              contactId: item.contactMethodId,
              contactMethod: item.contactMethod,
              icon: selectIconForLinks(item.contactMethod),
            };
          })}
          needMembers={{
            username: data.title,
            _id: data._id,
            level: data.needMembers,
          }}
          team={data.team as UserTeamItemProps[]}
        />
      </div>
    </>
  );
};

export default Page;
