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
import { toast } from "react-toastify";
import { useState } from "react";

const FormNewProject = ({
  defaultValues: dv,
  projectId: pid,
}: {
  defaultValues?: Partial<ProjectFormProps>;
  projectId?: string;
}) => {
  const { data }: any = useSession();
  const session = data?.user;
  const [projectId, setProjectId] = useState<string | undefined>(pid);
  if (
    dv?.repoName &&
    (dv?.repoName?.startsWith("/") ||
      !dv?.repoName?.startsWith("https://github.com"))
  ) {
    dv.repoName = "https://github.com" + dv.repoName;
  }
  const [defaultValues, setDefaultValues] = useState<Partial<ProjectFormProps>>(
    dv || {}
  );
  const { watch, setError, handleSubmit, setValue, ...form } =
    useForm<ProjectFormProps>({
      defaultValues: defaultValues as any,
      resolver: zodResolver(zodProjectFormSchema),
    });
  // console.log("defaultValues", watch());
  const onSubmit: SubmitHandler<ProjectFormProps> = async (data) => {
    try {
      if (JSON.stringify(data) === JSON.stringify(defaultValues)) {
        toast.success("Project Updated Successfully");
        return;
      }
      setDefaultValues(data);
      console.log("clicked");
      // const dt = zodProjectFormSchema.parse(data);
      // console.log(dt);
      // return;
      const url = projectId
        ? `/project/${projectId}/update`
        : "/db/createProject";
      const res = await createProjectUser(
        url,
        data,
        session,
        setError,
        projectId
          ? "Project Updated Successfully"
          : "Yo😎! Project created successfully👍.\n Add more details or view in profile."
      );
      console.log("res", res);
      if (res) {
        const json = await res.json();
        console.log("json", json);
        if (json.id) {
          setProjectId(json.id);
        }
      }
      return "ok";
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
        setValue={setValue}
        formId="projectForm"
        zodFormShape={zodProjectFormSchema.shape}
        onSubmit={handleSubmit(onSubmit)}
        buttons={
          <div className="fcfs w100 gap-2">
            <ImageUpload
              setValue={setValue}
              name={"imgs"}
              defaultImgs={defaultValues["imgs"]}
            />
            {projectId && (
              <ButtonBlue
                className="mt-6"
                type="button"
                label="View Project"
                href={projectId && `/project/${projectId}`}
              />
            )}
          </div>
        }
        buttonMessage={projectId ? "Update Project" : "Create Project"}
        commonClass={commonClass}
        fieldsArray={fieldsArray}
      />
    </>
  );
};

export default FormNewProject;
