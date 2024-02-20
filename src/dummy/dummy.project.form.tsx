import { devStages } from "@/lib/devStages";
import { projectDomains } from "@/lib/domains";
import { memberLevels } from "@/lib/memberLevel";
import { skills } from "@/lib/skills";
import { InputFieldProps } from "@/types/form.types";

export const dummyProjectFormSchemaFields: InputFieldProps[] = [
  {
    label: "Select GitHub Repository",
    desc: "Choose the GitHub repository for your project. If you don't see your repository, make sure you have installed the app in your GitHub account. You can also update the list of repositories by clicking the button above.",
    name: "repoName",
    options: [],
  },
  {
    label: "Title",
    desc: "What would you like to call your project?",
    name: "title",
  },
  {
    label: "Tagline",
    desc: "Briefly describe what your project is about (a short note or catchy intro).",
    name: "desc",
    type: "textarea",
  },
  {
    label: "Problem",
    desc: "Describe the problem your project aims to solve.",
    name: "projectDetails.problem",
    required: true,
  },
  {
    label: "Domains",
    desc: "Specify the domains or fields your project is related to.",
    name: "domain",
    multi: true,
    options: projectDomains as any,
    limit: 3,
  },
  {
    label: "Tech Stack",
    desc: "List the technologies or tools used in your project.",
    name: "skills",
    multi: true,
    // min: 3,
    limit: 10,
    options: skills as any, // Add options here if needed
  },
  {
    label: "Development Stage",
    desc: "Select the current development stage of your project.",
    name: "devStage",
    options: devStages,
  },
  // {
  //   label: "Team",
  //   desc: "Select the team members involved in the project.",
  //   name: "team",
  //   // Assuming zodUserTeamItemSchema is defined elsewhere
  //   // and represents the schema for team members
  // },

  // {
  //   label: "Images",
  //   desc: "Upload images related to your project.",
  //   name: "imgs",
  // },
  // {
  //   label: "Topics In Selected Domains",
  //   desc: "Choose topics within selected domains.",
  //   name: "topics",
  //   multi:true
  // },
  {
    label: "Video",
    desc: "Provide a link to a video showcasing your project (if available). Only YouTube or Loom links are supported.",
    name: "video",
  },
  {
    label: "Searching Members",
    desc: "Specify if you are looking for team members.",
    name: "skillLevel",
    options: memberLevels as any, // Assuming memberLevels is defined elsewhere
  },
  {
    label: "Challenges",
    desc: "List any challenges you encountered during the project development.",
    name: "projectDetails.challenges",
    limit: 5,
    editableList: {
      solution: true,
    },
  },
  {
    label: "Future Goals",
    desc: "Outline the future goals or milestones for your project.",
    name: "projectDetails.futureGoals",
    limit: 5,
    editableList: {
      needHelp: true,
    },
  },

  {
    label: "Published",
    desc: "Check this box if your project has been published or made public.",
    name: "published",
    type: "checkbox",
  },
];
// ChunkLoadError: Loading chunk app/layout failed.
// (timeout: http://localhost:3000/_next/static/chunks/app/layout.js)
