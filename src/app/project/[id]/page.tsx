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
import {
  zodProjectFormSchema,
  zodRepoName,
  zodTeamContactSchema,
} from "@/zod/zod.common";
import { Metadata } from "next";
import { z } from "zod";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params?.id;
  const {
    projectData: data,
  }: {
    projectData: FetchProjectProps["data"] | null;
    renderLanguages: ProjectRepoDetailsProps["languages"];
  } = await ProjectData(id as string);
  if (!data) {
    console.error("Project not found in open graph image");
    return {};
  }
  const { title, desc, imgs, skills, repoDetails, domain } = data;
  const img =
    Array.isArray(imgs) && imgs.length > 0
      ? imgs[0]
      : "https://devclans.com/metaImg.png";
  const description = desc
    ? desc.substring(0, 120) + ". | View more at Devclans"
    : `View ${title} at Devclans`;
  return {
    title,
    description,
    keywords: [
      title,
      "devclans",
      domain,
      ...skills,
      ...(repoDetails?.topics || []),
    ].slice(0, 10),
    openGraph: {
      title,
      description,
      url: `https://devclans.com/project/${id}`,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: `View ${title} at https://www.devclans.com | Devclans`,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: `View ${title} at https://www.devclans.com | Devclans | Find devs, projects, and mentors`,
        },
      ],
    },
  };
}

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
  console.log("data for id", id, "=> ", data);
  if (!data) {
    return <>No data Found With Id {id}</>;
  }

  const isOwner =
    data && data.owner && typeof data.owner == "object"
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
          <AboutTheRepo {...files} title={data.title} />
          {convertedProjectDetails && (
            <ProjectDetails data={convertedProjectDetails} />
          )}
        </div>
        {/* sidebar */}
        <ProjectSidebar
          links={data.projectLinks}
          contact={data.team.map((item) => {
            const a = zodTeamContactSchema.safeParse(item);
            return a.success
              ? {
                  ...a.data,
                  icon: selectIconForLinks(a.data.contactMethod),
                  name: a.data.username,
                  contactId: a.data.contactMethodId || a.data.discordId,
                  contactMethod: a.data.contactMethod as
                    | "discord"
                    | "email"
                    | "whatsapp"
                    | "telegram"
                    | "twitter", // Fix the type of contactMethod
                }
              : null;
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
