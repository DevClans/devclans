"use client"
import { ProjectStage, ProjectIconGroup, ChipGroup } from "@/components";
import ProductImg from "@/components/project/ProjectImg";
import { urlProject } from "@/constants";
import { msgSharingProject } from "@/lib/constants.messages";
import {
  ProjectProps,
  ProjectRepoDetailsProps,
} from "@/types/mongo/project.types";
import { PageProps } from "@/types/page.types";
import ProjectRepoDetails from "./ProjectRepoDetails";
import { convertVideoLinkToEmbed } from "@/utils/ConvertYoutubeLinkToEmbed";
import { useSession } from "next-auth/react";
import handleCopy from "@/utils/copyText";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
interface User {
  _id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const ProjectHero = ({
  skills = ["react", "nextjs", "typescript", "tailwindcss"],
  imgs,
  devStage,
  title,
  _id,
  likesCount,
  bookmarkCount,
  searchParams,
  desc,
  repoDetails,
  video,
  repoName,
  teamCode,
  owner,
}: Omit<ProjectProps, "repoDetails"> &
  PageProps & {
    repoDetails: Partial<ProjectRepoDetailsProps>;

  }) => {
  const data = {
    title,
    desc,
    _id,
    teamCode,
    owner,
    
  };
  const { data: session } = useSession();

// _id not found
const userDetails = (session?.user as User)?._id;

const [isCopied, SetCopied] = useState(false);

useEffect(() => {
  if (isCopied) {
    toast.success("Copied to clipboard")
    const timer = setTimeout(() => {
      SetCopied(false);
    }, 100 * 60); 

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }
}, [isCopied]);
  console.log("this is session",session);
  console.log("This is going to be the user id", userDetails);
  console.log("This is the owner of project:",data.owner?._id);
  const videoLink = convertVideoLinkToEmbed(video);
  return (
    <div className="card2 py-[30px] w100 fcfs gap-[30px] px-5">
      <div className="gap-5 fcfs w100">
        <div className="frcsb w100">
          <ProjectStage stage={devStage} />
          <ProjectIconGroup
            url={urlProject(_id)}
            message={msgSharingProject(title || "")}
            likesCount={likesCount}
            bookmarkCount={bookmarkCount}
            _id={data._id}
          />
        </div>
        <div className="frfssb w100 flex-wrap gap-5 ">
                  <div className="fcfs gap-5 max-w-[540px]">
                    <h1 className="text-4xl text-left ">{data.title}</h1>
                    <p>{data.desc}</p>
                    { data.owner?._id === userDetails &&
                   
                    <div className="cardHeader p-3 md:p-5 w100">
                    <div className="frfssb bg-">
                  
                    <h3 className="mx-1">Team Code: </h3>
                    <h3 className="mx-2">{data.teamCode}</h3>
                   <Image src="/copy.png" alt="Copy" width={20} height={20} onClick={()=>{handleCopy(data.teamCode); SetCopied(true)}} />
                    </div>
                    </div>
               
          }
                    {/* chips */}
                    <ChipGroup
                      arr={skills}
                      searchParams={searchParams}
                      baseUrl="/explore/projects"
                    />
                  </div>
          <ProjectRepoDetails repoName={repoName} {...repoDetails} />
        </div>
      </div>
      {/* images */}
      {true && (
        <div className="relative w100">
          <div className="frc gap-2 w100 scrollbar">
            {typeof videoLink == "string" && (
              <ProductImg isVideo={true} src={videoLink} />
            )}
            {Array.isArray(imgs) &&
              imgs.length > 0 &&
              imgs.map((img, i) => <ProductImg key={i} src={img} />)}
          </div>
          <div
            className="absolute top-0 h-full w-1/12 right-0 z-10 "
            style={{
              background:
                " linear-gradient(271deg, rgba(2, 11, 28, 0.85) 4.7%, rgba(217, 217, 217, 0.00) 99.35%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectHero;
