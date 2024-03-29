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
import { handleGithubConnect } from "@/utils/handleConnectGithub";
import { UploadDropzone } from "@/utils/uploadthing";
import ResumeUpload from "./ResumeUpload";

const FormNewUser = ({
  defaultValues: dv,
}: {
  defaultValues?: UserFormProps | UserProps;
}) => {
  const isEdit = false;
  const searchParams = useSearchParams();
  const newUser = searchParams.get("new");
  const { data }: any = useSession();
  const session = data?.user;
  const [githubLoading, setGithubLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<UserProps | UserFormProps>(
    (dv as unknown as UserProps) || {}
  );
  const [resumeUrl, setResumeUrl] = useState<string>("");
  // console.log("defaultValues", defaultValues);
  // const defaultValues: UserProps | UserFormProps =
  //   (dv as unknown as UserProps) || {};
  const githubUsername =
    searchParams.get("githubUsername") || session?.githubId;
  // TODO need a way to delete access token when it becomes invalid or regenrate it when needed
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
      data.contactMethodId = selectUserContactId(data) || session?.discordId;
      data.resume = resumeUrl; // Add the resume URL to the data object

      if (JSON.stringify(data) === JSON.stringify(defaultValues)) {
        toast.success("Project Updated Successfully!", {
          autoClose: false,
        });
        return;
      }

      setDefaultValues(data);
      const res = await createProjectUser(
        `/user/${userid}/update`,
        data,
        session,
        setError,
        "Profile Updated Successfully"
      );
      return data;
    } catch (error: any) {
      console.error("error in onSubmit of FormNewUser", error);
      setError("root", {
        message: error?.message,
      });
    }
  };
  const contactMethod = watch("contactMethod");
  console.log("contactMethod", contactMethod);
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
      label: "Tech Stack:",
      name: "skills",
      options: skills as any,
      multi: true,
      desc: "Select tech stack you use from the list.",
      limit: 10,
      // min: 3,
    },
    {
      label: "Skill Level:",
      name: "skillLevel",
      desc: "Select what level you would give yourself for the skills you have in selected domain.",
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
      required: contactMethod === "email",
      desc: "Enter your email address.",
    },
    {
      label: "Phone Number:",
      name: "phone",
      type: "number",
      required: contactMethod === "whatsapp",
      desc: "Enter your phone number.",
    },
    {
      label: "Twitter Handle:",
      name: "socials.twitter",
      required: contactMethod === "twitter",
      desc: "Enter your Twitter handle.",
      preText: "https://x.com/",
    },
    {
      label: "Telegram :",
      name: "socials.telegram",
      required: contactMethod === "telegram",
      desc: "Enter your Telegram username.",
    },
    {
      label: "LinkedIn Profile:",
      name: "socials.linkedin",
      desc: "Enter your LinkedIn profile URL.",
      preText: "https://linkedin.com/in/",
    },
    {
      label: "Portfolio:",
      name: "socials.website",
      desc: "Enter your portfolio website URL.",
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
    // {
    //   label: "Upload Resume:",
    //   name: "resume",
    //   type: "file",
    //   accept: "application/pdf",
    //   desc: "Upload your resume in PDF format.",
    // },
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

  const handleConnectGitHub = async () => {
    setGithubLoading(true);
    const data: any = watch();
    let isNew = false;
    if (defaultValues && data && typeof defaultValues === "object") {
      for (const key in data) {
        if (
          data[key] &&
          JSON.stringify(data[key]) !=
            JSON.stringify((defaultValues as any)[key])
        ) {
          console.log("isNew", key, data[key], (defaultValues as any)[key]);
          isNew = true;
        }
      }
      if (isNew) {
        const ques = confirm(
          "You have unsaved changes. Automatically save changes for me before continuing?"
        );
        if (ques) {
          await handleSubmit(onSubmit)();
        }
      }
    }
    handleGithubConnect();
    setGithubLoading(false);
  };

  if (!session) {
    return <LogedOutScreen />;
  }
  return (
    <>
      {
        <FormServer
          defaultValues={defaultValues}
          isNew={newUser == "true"}
          heading="Lets Create Your Profile"
          setValue={setValue}
          buttons={
            <div className="fcfs w100 gap-2">
            {/* <ResumeUpload setValue={setValue} defaultResumeUrl={defaultValues.resume} /> */}
            <ResumeUpload
              setValue={setValue}
              defaultResumeUrl={defaultValues.resume}
              onResumeUpload={(resumeUrl) => setResumeUrl(resumeUrl)}
            />
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
            </div>
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
