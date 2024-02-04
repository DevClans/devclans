"use client";
import { InputFieldProps } from "@/types/form.types";
import { ProjectFormProps, ProjectProps } from "@/types/mongo/project.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormServer from "./FormServer";
import { userFormShape, zodProjectFormSchema } from "@/zod/zod.common";
import { useSession } from "next-auth/react";
import { dummyProjectFormSchemaFields } from "@/dummy/dummy.project.form";
import { createProjectUser } from "@/utils/createProjectUser";

const FormNewProject = () => {
  const { data }: any = useSession();
  const session = data?.user;
  const defaultValues: ProjectFormProps = {
    title: "My Awesome Project",
    desc: "This project aims to revolutionize...",
    skills: ["JavaScript", "React", "Node.js"],
    team: ["John Doe", "Jane Smith"],
    needMembers: "intermediate",
    imgs: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    topics: ["Web Development", "Machine Learning"],
    repoName: "my-awesome-project",
    projectLinks: ["https://example.com/project-link"],
    video: "https://youtube.com/watch?v=abc123",
    devStage: "development",
    published: true,
    domain: "web",
    projectDetails: {
      futureGoals: [
        {
          title: "Future Goal 1",
          desc: "This project aims to revolutionize...",
          needHelp: false,
        },
      ],
      problem: "This project aims to revolutionize...",
    },
  };
  const { watch, setError, setValue, handleSubmit, ...form } =
    useForm<ProjectFormProps>({
      defaultValues: defaultValues as any,
      // resolver: zodResolver(zodProjectFormSchema),
    });
  console.log(watch());
  const onSubmit: SubmitHandler<ProjectProps> = async (data) => {
    try {
      console.log("clicked");
      return await createProjectUser(
        "/db/createProject",
        data,
        session,
        setError
      );
    } catch (err) {
      console.log(err);
    }
  };
  // const onSubmit = ()=>{
  //   console.log("clicked");

  // }
  const commonClass: string = "w100";

  const fieldsArray: InputFieldProps[] = dummyProjectFormSchemaFields;

  if (!session) {
    return <p className="">You need to be logged in to create a project.</p>;
  }
  return (
    <>
      <FormServer
        heading="Create A New Project"
        {...form}
        formId="projectForm"
        zodFormShape={userFormShape}
        onSubmit={handleSubmit(onSubmit as any)}
        // onSubmit={handleSubmit(onSubmit)}
        commonClass={commonClass}
        fieldsArray={fieldsArray}
      />
    </>
  );
};

export default FormNewProject;
