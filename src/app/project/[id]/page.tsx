import {
  LightLine,
  ProjectHero,
  ProjectDetails,
  ProjectSidebar,
  AboutTheRepo,
  ProjectData,
} from "@/components";
import FormNewProject from "@/components/FormNewProject";
import { selectIconForLinks } from "@/lib/socialIcons";
import { FetchProjectProps } from "@/types/fetch.types";
import { ProjectRepoDetailsProps } from "@/types/mongo/project.types";
import { UserTeamItemProps } from "@/types/mongo/user.types";
import { PageProps } from "@/types/page.types";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { convertProjectDetails } from "@/utils/convertProjectDetails";
import { zodProjectFormSchema, zodRepoName } from "@/zod/zod.common";
import { z } from "zod";

const Page = async ({
  params,
  searchParams,
}: { params: { id: string } } & PageProps & {
    searchParams: { mode?: string };
  }) => {
  const id = params.id;
  const mode = searchParams?.mode;
  console.log("mode", mode);
  const isEdit = mode == "edit";
  const session: any = await getServerSessionForServer();
  const userid = session?.user?._id;
  const {
    projectData: data,
    renderLanguages,
  }: {
    projectData: FetchProjectProps["data"] | null;
    renderLanguages: ProjectRepoDetailsProps["languages"];
  } = await ProjectData(id);
  console.log("data for id", id, "=> ", Boolean(data));
  if (!data) {
    return <>No data Found With Id {id}</>;
  }
  const isOwner =
    typeof data?.owner == "object"
      ? data.owner._id === userid
      : data.owner === userid;
  // console.log("owner", isOwner, data.owner);
  const convertedProjectDetails = convertProjectDetails(data?.projectDetails);
  const files = {
    readme: data?.repoDetails?.readme || "",
    contributing: data?.repoDetails?.contributing || "",
  };

  if (isEdit && isOwner) {
    const defaultValues = zodProjectFormSchema
      .omit({ repoName: true })
      .extend({
        repoName: z.union([
          zodRepoName,
          z
            .string()
            .refine(
              (item) => {
                if (
                  item?.startsWith("/") &&
                  item?.substring(1)?.split("/")?.length >= 2
                )
                  return true;
                return false;
              },
              {
                message: "Invalid github reponame",
              }
            )
            .transform((item) => "https://github.com" + item),
        ]),
      })
      .partial()
      .safeParse(data);
    if (!defaultValues.success)
      console.log("defaultValues", defaultValues.error);
    return (
      <FormNewProject
        projectId={id}
        defaultValues={
          defaultValues.success ? defaultValues.data : (data as any)
        }
      />
    );
  }

  return (
    <>
      <LightLine />
      <div className="container p-[30px] gap-[30px] flex flex-col items-center  lg:flex-row lg:items-start lg:justify-between w100">
        <div className="w100 fcc gap-[30px]">
          <ProjectHero
            {...data}
            repoDetails={{
              ...data.repoDetails,
              languages: renderLanguages,
            }}
            params={params}
            searchParams={searchParams}
          />
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
              name: item.username,
              contactId: item.contactMethodId || item.discordId,
              contactMethod: item.contactMethodId
                ? item.contactMethod
                : "discord",
              icon: selectIconForLinks(item.contactMethod),
            };
          })}
          skillLevel={{
            username: data.title,
            _id: data._id,
            level: data.skillLevel,
          }}
          team={data.team as UserTeamItemProps[]}
        />
      </div>
    </>
  );
};

export default Page;
