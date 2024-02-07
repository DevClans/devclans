"use client";
import { InputFieldProps } from "@/types/form.types";
import { UserFormProps } from "@/types/mongo/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormServer from "./FormServer";
import { skills } from "@/lib/skills";
import { projectDomains } from "@/lib/domains";
import { contactMethods } from "@/lib/contactMethods";
import { userFormShape, zodUserFormSchema } from "@/zod/zod.common";
import { ButtonBlue } from ".";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { createProjectUser } from "@/utils/createProjectUser";
import { ProjectFormProps } from "@/types/mongo/project.types";
import { useRouter } from "next/navigation";
import selectUserContactId from "@/lib/selectUserContactId";

const FormNewUser = ({
  defaultValues: dv,
}: {
  defaultValues?: UserFormProps | ProjectFormProps;
}) => {
  const router = useRouter();
  const isEdit = Boolean(dv);
  const searchParams = useSearchParams();
  const { data }: any = useSession();
  const githubUsername = searchParams.get("githubUsername");
  const session = data?.user;
  const defaultValues = dv || {};
  console.log("defaultValues", defaultValues);
  const { watch, setError, setValue, handleSubmit, ...form } =
    useForm<UserFormProps>({
      defaultValues: defaultValues as any,
      resolver: zodResolver(zodUserFormSchema),
    });
  const userid = session?._id;
  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    data.contactMethodId = selectUserContactId(data);
    const res = await createProjectUser(
      "/user/update/" + userid,
      data,
      session,
      setError
    );
    console.log("res", res, session);
    if (res && userid) {
      router.push(`/user/${userid}?tab=overview`);
    }
    return data;
  };
  const contactMethod = watch("contactMethod");
  const commonClass: string = "w100";

  const fieldsArray: InputFieldProps[] = [
    // {
    //   label: "GitHub ID:",
    //   name: "githubId",
    // },
    {
      label: "Bio:",
      name: "bio",
    },
    {
      label: "Skills:",
      name: "skills",
      options: skills as any,
      multi: true,
    },
    {
      label: "Domain:",
      name: "domain",
      options: projectDomains as any,
    },
    {
      label: "Current Company:",
      name: "questions.currentCompany",
    },
    {
      label: "Proud Achievement:",
      name: "questions.proudAchievement",
    },
    {
      label: "Recent Work:",
      name: "questions.recentWork",
    },
    {
      label: "Contact Method:",
      name: "contactMethod",
      options: contactMethods,
    },
    // {
    //   label: `Contact ID (${contactMethod}):`,
    //   name: "contactMethodId",
    //   condition: ["telegram"].includes(contactMethod),
    // },
    {
      label: "Email:",
      name: "email",
      condition: contactMethod === "email",
    },
    {
      label: "Phone Number:",
      name: "phone",
      type: "number",
      condition: contactMethod === "whatsapp",
    },
    {
      label: "Twitter Handle:",
      name: "socials.twitter",
      condition: contactMethod === "twitter",
    },
    {
      label: "LinkedIn Profile:",
      name: "socials.linkedin",
    },
    {
      label: "Portfolio:",
      name: "socials.website",
    },
    {
      label: "Telegram :",
      name: "socials.telegram",
      condition: contactMethod === "telegram",
    },
    {
      label: "Career Goal:",
      name: "questions.careerGoal",
      options: ["remote", "faang", "startup"],
      multi: true,
    },
  ];
  useEffect(() => {
    console.log("Route Parameter: ", githubUsername);
    const username = Array.isArray(githubUsername)
      ? githubUsername[0]
      : githubUsername;

    if (username) {
      setValue("githubId" as any, username);
    }
  }, [githubUsername]);

  // console.log("githubUsername", githubUsername);
  // console.log("session", session);
  // console.log("errors", errors);

  const handleConnectGitHub = () => {
    const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const CALLBACK_URL =
      process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL +
      `${userid ? `?userid=${userid}` : ""}`; // both id and query works
    // TODO encrypt the user id
    console.log("CLIENT_ID", CLIENT_ID, CALLBACK_URL);
    const state = userid;
    const SCOPES = "read:user,user:email";
    window.location.href = `${GITHUB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=${SCOPES}${
      state ? `&state=${state}` : ""
    }`;
  };
  // console.log("contactMethod", contactMethod === "whatsapp");

  if (!session) {
    return <p className="">You need to be logged in to view your profile.</p>;
  }
  return (
    <>
      {
        <FormServer
          defaultValues={defaultValues}
          isEdit={isEdit}
          heading="Lets Create Your Profile"
          setValue={setValue}
          buttons={
            <ButtonBlue
              disabled={Boolean(githubUsername)}
              className="mt-4"
              label={githubUsername ? "Connected" : "Connect Your GitHub"}
              onClick={handleConnectGitHub}
            />
          }
          {...form}
          zodFormShape={userFormShape}
          onSubmit={handleSubmit(onSubmit)}
          commonClass={commonClass}
          fieldsArray={fieldsArray}
        />
      }
    </>
  );
};

export default FormNewUser;
