"use client";
import { InputFieldProps } from "@/types/form.types";
import { ProjectFormProps, ProjectProps } from "@/types/mongo/project.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormServer from "./FormServer";
import { userFormShape, zodProjectFormSchema } from "@/zod/zod.common";
import { useSession } from "next-auth/react";
import { dummyProjectFormSchemaFields } from "@/dummy/dummy.project.form";
import { createProjectUser } from "@/api/createProjectUser";

const FormNewProject = () => {
  const { data }: any = useSession();
  const session = data?.user;
  const defaultValues = {};
  const { watch, setError, setValue, handleSubmit, ...form } =
    useForm<ProjectFormProps>({
      defaultValues: defaultValues as any,
      resolver: zodResolver(zodProjectFormSchema),
    });

  const onSubmit: SubmitHandler<ProjectProps> = async (data) =>
    await createProjectUser("/project/update", data, session, setError);
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
        zodFormShape={userFormShape}
        onSubmit={handleSubmit(onSubmit as any)}
        commonClass={commonClass}
        fieldsArray={fieldsArray}
      />
    </>
  );
};

export default FormNewProject;
