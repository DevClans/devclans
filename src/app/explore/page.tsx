import ProjectItem from "@/components/listItems/ProjectItem";
import { ProjectProps } from "@/types/mongo/project.types";
import UserItem from "@/components/listItems/UserItem";
import { UserProps } from "@/types/mongo/user.types";
import { Fetch } from "@/utils/fetchApi";
import { PageProps } from "@/types/page.types";

const page = async ({ params, searchParams }: PageProps) => {
  console.log("params", params);
  console.log("searchParams", searchParams);
  const { type }: any = searchParams;
  if (type === "users") {
    return <Users searchParams={searchParams} />;
  }
  return <Projects searchParams={searchParams} />;
};

export default page;
const Users = async ({ params, searchParams }: Partial<PageProps>) => {
  const users: UserProps[] = await Fetch({
    endpoint: "/user",
    headers: {
      "cache-control": "no-store",
    } as any,
  });
  // console.log(users, "users in frontend");
  return (
    <div className="w100 fcfs gap-6">
      {users.map((user, i) => {
        return <UserItem searchParams={searchParams} key={i} {...user} />;
      })}
    </div>
  );
};

const Projects = async ({ params, searchParams }: Partial<PageProps>) => {
  const projects: ProjectProps[] = await Fetch({ endpoint: "/project" });
  // console.log(projects, "projects in frontend");
  return (
    <div className="fcfs w100 gap-6">
      {projects.map((product, i) => (
        <ProjectItem searchParams={searchParams} {...product} key={i} />
      ))}
    </div>
  );
};
