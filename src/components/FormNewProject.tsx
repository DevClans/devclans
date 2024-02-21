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
import { ButtonBlue, ButtonSecondary } from ".";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getGHInstaddedRepos } from "@/utils/getInstalledRepos";
import {
  handleGithubChangeRepos,
  handleGithubConnect,
} from "@/utils/handleConnectGithub";
import ButtonConnectGithub from "./buttons/ButtonConnectGithub";

const FormNewProject = ({
  defaultValues: dv,
  projectId: pid,
}: {
  defaultValues?: Partial<ProjectFormProps>;
  projectId?: string;
}) => {
  const { data }: any = useSession();
  const pathname = usePathname();
  const session = data?.user;
  const repos = session?.repos;
  const isUserConnected = Boolean(session?.githubId);
  const [projectId, setProjectId] = useState<string | undefined>(pid);
  const [defaultValues, setDefaultValues] = useState<Partial<ProjectFormProps>>(
    dv || {}
  );
  const { watch, setError, handleSubmit, setValue, ...form } =
    useForm<ProjectFormProps>({
      defaultValues: defaultValues as any,
      resolver: zodResolver(zodProjectFormSchema),
    });
  console.log("defaultValues", watch("repoName"));
  const onSubmit: SubmitHandler<ProjectFormProps> = async (data) => {
    try {
      // const a = zodProjectFormSchema.parse(data);
      // console.log("a", a);
      // return
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

  const [fieldsArray, setFieldsArray] = useState<InputFieldProps[]>(
    dummyProjectFormSchemaFields
  );
  const updateRepofield = (repos: string[], label: boolean = false) => {
    const repoField = fieldsArray.find((f) => f.name === "repoName");
    console.log("found repoField", repoField);
    if (repoField) {
      repoField.options = repos;
      if (label) {
        repoField.label = (
          <div className="frc gap-2">
            {`Select Github Repository`}

            {isUserConnected ? (
              <ButtonSecondary
                type="button"
                style={{ height: 30, fontSize: 12, maxWidth: 150 }}
                label={"Change Github Repos"}
                onClick={handleGithubChangeRepos}
              />
            ) : (
              <ButtonConnectGithub
                style={{ height: 30, fontSize: 12, maxWidth: 150, padding: 0 }}
              />
            )}
          </div>
        );
      }
      console.log("repoField", repoField);
      setFieldsArray([...fieldsArray]);
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (Array.isArray(repos) && repos.length > 0) {
      updateRepofield([null, ...repos], true);
    }
  }, [repos]);

  useEffect(() => {
    if (!isUserConnected) {
      updateRepofield([], true);
      return;
    }
    let updatedRepos = false;
    updateRepofield(["Loading..."], true);
    getGHInstaddedRepos(session?._id)
      .then((res) => {
        console.log("res from getGHInstaddedRepos", res);
        if (res && res.repos) {
          updatedRepos = updateRepofield([null, ...repos]);
        }
      })
      .finally(() => {
        if (!updatedRepos) {
          console.log("null,[...repos] not updated");
          updateRepofield([]);
        }
      });
  }, [session?._id, isUserConnected]);

  if (!session) {
    return <LogedOutScreen />;
  }
  return (
    <>
      <FormServer
        defaultValues={defaultValues}
        heading="Create A New Project"
        {...form}
        isNew={Boolean(pathname.includes("/new"))}
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
