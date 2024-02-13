"use client";
import { InputFieldProps } from "@/types/form.types";
import { UserFormProps, UserProps } from "@/types/mongo/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormServer from "./FormServer";
import { skills } from "@/lib/skills";
import { projectDomains } from "@/lib/domains";
import { contactMethods } from "@/lib/contactMethods";
import { userFormShape, zodUserFormSchema } from "@/zod/zod.common";
import { ButtonBlue } from ".";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { createProjectUser } from "@/utils/createProjectUser";
import selectUserContactId from "@/lib/selectUserContactId";
import LogedOutScreen from "./LogedOutScreen";
import { toast } from "react-toastify";
import { memberLevels } from "@/lib/memberLevel";

const FormNewUser = ({
  defaultValues: dv,
}: {
  defaultValues?: UserFormProps | UserProps;
}) => {
  const isEdit = false;
  const searchParams = useSearchParams();
  const { data }: any = useSession();
  const session = data?.user;
  const [githubLoading, setGithubLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<UserProps | UserFormProps>(
    (dv as unknown as UserProps) || {}
  );
  console.log("defaultValues", defaultValues);
  // const defaultValues: UserProps | UserFormProps =
  //   (dv as unknown as UserProps) || {};
  const githubUsername =
    searchParams.get("githubUsername") ||
    session?.githubId ||
    ("githubId" in defaultValues && defaultValues?.githubId) ||
    ("githubDetails" in defaultValues && defaultValues?.githubDetails?.login);
  // TODO this should be based on access token. if we have access token then user is connected
  // console.log("defaultValues", defaultValues);
  const { watch, setError, setValue, handleSubmit, ...form } =
    useForm<UserFormProps>({
      defaultValues: defaultValues as any,
      resolver: zodResolver(zodUserFormSchema),
    });
  // console.log("defaultValues", defaultValues, watch("questions.careerGoal"));
  const userid = session?._id;
  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    try {
      data.contactMethodId = selectUserContactId(data);
      // console.log("data", JSON.stringify(data), JSON.stringify(defaultValues));
      if (JSON.stringify(data) === JSON.stringify(defaultValues)) {
        toast.success("Project Updated Successfully!", {
          autoClose: false,
        });
        console.log("No change in data");
        return;
      }
      // console.log("setting data", data);
      setDefaultValues(data);
      const res = await createProjectUser(
        `/user/${userid}/update`,
        data,
        session,
        setError,
        "Profile Updated Successfully"
      );
      console.log("res", res, session);
      // if (!res && session) {
      //   throw new Error("Error in our server. Please try again later.");
      // }
      return data;
    } catch (error: any) {
      console.error("error in onSubmit of FormNewUser", error);
      setError("root", {
        message: error?.message,
      });
    }
  };
  const contactMethod = watch("contactMethod");
  const commonClass: string = "w100";

  const fieldsArray: InputFieldProps[] = [
    // {
    //   label: "GitHub ID:",
    //   name: "githubId",
    //   desc: "Enter your GitHub ID.",
    // },
    {
      label: "Bio:",
      name: "bio",
      desc: "Enter a brief description about yourself.",
    },
    {
      label: "Skills:",
      name: "skills",
      options: skills as any,
      multi: true,
      desc: "Select your skills from the list.",
      limit: 10,
      // min: 3,
    },
    {
      label: "Skill Level:",
      name: "Select what level you would give yourself for the skills you have in selected domain.",
      options: memberLevels as any,
    },
    {
      label: "Domain:",
      name: "domain",
      options: projectDomains as any,
      desc: "Choose your domain of expertise.",
    },
    {
      label: "Current Company:",
      name: "questions.currentCompany",
      desc: "Specify your current employer.",
    },
    {
      label: "Proud Achievement:",
      name: "questions.proudAchievement",
      desc: "Share a proud achievement from your career or personal life.",
    },
    {
      label: "Recent Work:",
      name: "questions.recentWork",
      desc: "Describe your recent work experience or project.",
    },
    {
      label: "Contact Method:",
      name: "contactMethod",
      options: contactMethods,
      desc: "Select your preferred contact method.",
    },
    {
      label: "Email:",
      name: "email",
      condition: contactMethod === "email",
      desc: "Enter your email address.",
    },
    {
      label: "Phone Number:",
      name: "phone",
      type: "number",
      condition: contactMethod === "whatsapp",
      desc: "Enter your phone number.",
    },
    {
      label: "Twitter Handle:",
      name: "socials.twitter",
      condition: contactMethod === "twitter",
      desc: "Enter your Twitter handle.",
    },
    {
      label: "LinkedIn Profile:",
      name: "socials.linkedin",
      desc: "Enter your LinkedIn profile URL.",
    },
    {
      label: "Portfolio:",
      name: "socials.website",
      desc: "Enter your portfolio website URL.",
    },
    {
      label: "Telegram :",
      name: "socials.telegram",
      condition: contactMethod === "telegram",
      desc: "Enter your Telegram username.",
    },
    {
      label: "Career Goal:",
      name: "questions.careerGoal",
      options: ["remote", "faang", "startup"],
      multi: true,
      desc: "Select your career goals.",
      limit: 3,
      // min: 1,
    },
  ];

  // Type assertion
  const fieldsArrayWithDesc = fieldsArray as { desc: string }[];

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
    setGithubLoading(true);
    // setting values before redirecting to github
    setDefaultValues(watch()); // TODO needs testing
    const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const CALLBACK_URL =
      process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL +
      `${userid ? `?userid=${userid}` : ""}`; // both id and query works
    // TODO encrypt the user id
    console.log("CLIENT_ID", CLIENT_ID, CALLBACK_URL);
    const state = userid;
    const SCOPES = "read:user,user:email,repo";
    window.location.href = `${GITHUB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=${SCOPES}${
      state ? `&state=${state}` : ""
    }`;
  };
  // console.log("contactMethod", contactMethod === "whatsapp");

  if (!session) {
    return <LogedOutScreen />;
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
              loading={githubLoading}
              className="mt-4"
              type="button"
              label={
                githubUsername
                  ? "Connected To Github" +
                    `${githubUsername ? ": " + githubUsername : ""}`
                  : "Connect Your GitHub"
              }
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
