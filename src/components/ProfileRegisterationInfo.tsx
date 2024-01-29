"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { urlApi } from "@/constants";
import { userFormShape, zodUserFormSchema } from "@/zod/zod.common";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserProps } from "@/types/mongo/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { contactMethods } from "@/lib/contactMethods";
import { skills } from "@/lib/skills";
import MultipleSelectChip from "./MultiSelect";
import { projectDomains } from "@/lib/domains";
import { ButtonBlue, ButtonSecondary } from ".";
import { toast } from "react-toastify";

const Profile = () => {
  const { data }: any = useSession();
  const session = data?.user;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    control,
    formState: { isSubmitted, errors, isSubmitting },
  } = useForm<UserProps>({
    // mode: "onBlur",
    defaultValues: {
      contactMethod: "discord",
      domain: "web" as any,
      skills: [] as any,
      socials: {
        twitter: "",
        linkedin: "",
        website: "",
        telegram: "",
      },
      questions: {
        careerGoal: "remote",
        currentCompany: "asd",
        proudAchievement: "asd",
        recentWork: "asd",
      },
      bio: "asdasdfdafa",
    },
    resolver: zodResolver(zodUserFormSchema),
  });
  console.log("isSubmitted", isSubmitted);
  console.log("isSubmitting", isSubmitting);
  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      console.log("inside handleSubmit");
      // Check if the user is authenticated
      if (!(session && session?._id)) {
        console.error("User is not authenticated.");
        return;
      }
      const response = await fetch(`${urlApi}/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, id: session._id }),
      });
      console.log("response", response.status, response.statusText);
      if (response.status > 200) {
        throw new Error(`${response.statusText}`);
      }
      console.log("Profile updated successfully");
      toast.success("Profile updated successfully");
      return data;
    } catch (error: any) {
      console.error("Error updating profile", error.message);
      setError("root", {
        message: error?.message,
      });
    }
  };

  const searchParams = useSearchParams();
  const githubUsername = searchParams.get("githubUsername");

  useEffect(() => {
    console.log("Route Parameter: ", githubUsername);
    const username = Array.isArray(githubUsername)
      ? githubUsername[0]
      : githubUsername;

    if (username) {
      setValue("githubId", username);
    }
  }, [githubUsername]);

  // console.log("githubUsername", githubUsername);
  // console.log("session", session);
  // console.log("errors", errors);

  const handleConnectGitHub = () => {
    const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const CALLBACK_URL = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL;
    const SCOPES = "read:user,user:email";

    window.location.href = `${GITHUB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=${SCOPES}`;
  };
  const commonClass: string = "w100";
  const contactMethod = watch("contactMethod");
  // console.log("contactMethod", contactMethod === "whatsapp");
  const fieldsArray = [
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
      options: skills,
      multi: true,
    },
    {
      label: "Domain:",
      name: "domain",
      options: projectDomains,
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
    {
      label: `Contact ID (${contactMethod}):`,
      name: "questions.contactId",
      condition: ["telegram"].includes(contactMethod),
    },
    {
      label: "Email:",
      name: "email",
      condition: contactMethod === "email",
    },
    {
      label: "Phone Number:",
      name: "phone",
      type: "number",
      conditon: contactMethod === "whatsapp",
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
    },
  ];

  if (!session) {
    return <p className="">You need to be logged in to view your profile.</p>;
  }
  return (
    <div className="w100 container p-6">
      <h1 className="text-[36px]">Lets Create Your profile</h1>
      <h2>{githubUsername}</h2>

      <form
        id="userForm"
        className="fcfs gap-4 w100"
        // action={`${urlApi}/user/profile`}
        // onSuccess={() => {
        //   alert("onSuccess");
        // }}
        // onError={() => {
        //   alert("onError");
        // }}
        onSubmit={handleSubmit(onSubmit)}
        // control={control}
      >
        {/* New fields */}
        {fieldsArray.map(
          ({ label, name, options, type, condition, multi = false }, i) => {
            // const conditions:any = {}
            // if (typeof condition == "boolean" && condition) {
            //   conditions.required = true
            // }
            const selectEle = (
              <select className={` ${commonClass}`} {...register(name as any)}>
                {options?.map((option: string, i: number) => (
                  <option key={i} value={option} className={` ${commonClass}`}>
                    {option}
                  </option>
                ))}
                )
              </select>
            );
            const multiSelectEle = (
              <MultipleSelectChip
                register={register}
                name={name as any}
                options={options as string[]}
              />
            );
            const inputEle = (
              <input
                {...register(name as any)}
                type={type || "text"}
                className={` ${commonClass}`}
              />
            );
            // console.log("condition", condition, name);
            if (typeof condition == "boolean" && condition == false) {
              return null;
            }
            const isRequired =
              condition ||
              (name.includes(".")
                ? false
                : userFormShape[name as keyof typeof userFormShape]
                ? !userFormShape[
                    name as keyof typeof userFormShape
                  ].isOptional()
                : false);
            // console.log(
            //   "isRequired",
            //   isRequired,
            //   name,
            //   userFormShape[name as keyof typeof userFormShape]?.isOptional()
            // );

            return (
              <div key={i + "parent"} className={`fcc gap-2 w100`}>
                {/* <div className=""> */}
                <label className="w100 text-xs">
                  {isRequired && "*"} {label}
                </label>
                {Boolean(options)
                  ? multi
                    ? multiSelectEle
                    : selectEle
                  : inputEle}
                {/* </div> */}
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </div>
            );
          }
        )}
        <ErrorMessage
          errors={errors}
          name="root"
          render={({ message }) => <p className="error">{message}</p>}
        />
        <ButtonSecondary
          label={isSubmitting ? "Loading..." : "Update Profile"}
          disabled={isSubmitting}
          type="submit"
          form="userForm"
        />
      </form>
      {/* GitHub Connection Button */}
      <ButtonBlue
        className="mt-4"
        label={"Connect Your GitHub"}
        onClick={handleConnectGitHub}
      />
    </div>
  );
};

export default Profile;
