"use client";
import { InputFieldProps } from "@/types/form.types";
import { ProjectFormProps } from "@/types/mongo/project.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormServer from "./FormServer";
import { zodProjectFormSchema } from "@/zod/zod.common";
import { useSession } from "next-auth/react";
import { dummyProjectFormSchemaFields } from "@/dummy/dummy.project.form";
import { createProjectUser } from "@/utils/createProjectUser";
import ImageUpload from "./ImageUpload";
import LogedOutScreen from "./LogedOutScreen";
import { ButtonBlue } from ".";

const FormNewProject = ({
  defaultValues: dv,
  projectId,
}: {
  defaultValues?: Partial<ProjectFormProps>;
  projectId?: string;
}) => {
  const { data }: any = useSession();
  const session = data?.user;
  if (
    dv?.repoName &&
    (dv?.repoName?.startsWith("/") ||
      !dv?.repoName?.startsWith("https://github.com"))
  ) {
    dv.repoName = "https://github.com" + dv.repoName;
  }
  const defaultValues: Partial<ProjectFormProps> = dv || {};
  const { watch, setError, handleSubmit, ...form } = useForm<ProjectFormProps>({
    defaultValues: defaultValues as any,
    resolver: zodResolver(zodProjectFormSchema),
  });
  console.log("defaultValues", watch());
  const onSubmit: SubmitHandler<ProjectFormProps> = async (data) => {
    try {
      console.log("clicked", data);
      // const dt = zodProjectFormSchema.parse(data);
      // console.log(dt);
      // return;
      const url = projectId
        ? `/project/${projectId}/update`
        : "/db/createProject";
      return await createProjectUser(url, data, session, setError);
    } catch (err: any) {
      console.log(err, "in catch block of onSubmit in FormNewProject");
      setError("root", {
        message: err?.message,
      });
    }
  };
  // const onSubmit = ()=>{
  //   console.log("clicked");

  // }
  const commonClass: string = "w100";

  const fieldsArray: InputFieldProps[] = dummyProjectFormSchemaFields;

  if (!session) {
    return <LogedOutScreen />;
  }
  return (
    <>
      <FormServer
        defaultValues={defaultValues}
        heading="Create A New Project"
        {...form}
        formId="projectForm"
        zodFormShape={zodProjectFormSchema.shape}
        onSubmit={handleSubmit(onSubmit)}
        buttons={
          <div className="fcc w100 gap-2 mt-2">
            {projectId && (
              <ButtonBlue
                type="button"
                label="View Project"
                href={projectId && `/project/${projectId}`}
              />
            )}
            <ImageUpload />
          </div>
        }
        commonClass={commonClass}
        fieldsArray={fieldsArray}
      />
    </>
  );
};

export default FormNewProject;
