import { devStages } from "@/lib/devStages";
import { projectDomains } from "@/lib/domains";
import { memberLevels } from "@/lib/memberLevel";
import { skills } from "@/lib/skills";
import { InputFieldProps } from "@/types/form.types";

export const dummyProjectFormSchemaFields: InputFieldProps[] = [
  {
    label: "Title",
    name: "title",
  },
  {
    label: "Description",
    name: "desc",
    type: "textarea",
  },
  {
    label: "Tech Stack",
    name: "skills",
    multi: true,
    options: skills as any, // Add options here if needed
  },
  // {
  //   label: "Team",
  //   name: "team",
  //   // Assuming zodUserTeamItemSchema is defined elsewhere
  //   // and represents the schema for team members
  // },
  {
    label: "Need Members",
    name: "needMembers",
    options: memberLevels as any, // Assuming memberLevels is defined elsewhere
  },
  // {
  //   label: "Images",
  //   name: "imgs",
  // },
  // {
  //   label: "Topics In Selected Domains",
  //   name: "topics",
  //   multi:true
  // },
  {
    label: "Repository Name",
    name: "repoName",
  },
  // {
  //   label: "Project Links",
  //   name: "projectLinks",
  // },
  {
    label: "Video",
    name: "video",
  },
  {
    label: "Project Details - Problem",
    name: "projectDetails.problem",
  },
  {
    label: "Challenges",
    name: "projectDetails.challenges",
    editableList: {
      solution: true,
    },
  },
  {
    label: "Future Goals",
    name: "projectDetails.futureGoals",
    editableList: {
      needHelp: true,
    },
  },
  // {
  //   label: "Project Details - Challenges - Title",
  //   name: "projectDetails.challenges.title",
  // },
  // {
  //   label: "Project Details - Challenges - Description",
  //   name: "projectDetails.challenges.desc",
  // },
  // {
  //   label: "Project Details - Challenges - Solution",
  //   name: "projectDetails.challenges.solution",
  // },
  // {
  //   label: "Project Details - Future Goals - Title",
  //   name: "projectDetails.futureGoals.title",
  // },
  // {
  //   label: "Project Details - Future Goals - Description",
  //   name: "projectDetails.futureGoals.desc",
  // },
  // {
  //   label: "Project Details - Future Goals - Need Help",
  //   name: "projectDetails.futureGoals.needHelp",
  //   type: "checkbox",
  // },
  // {
  //   label: "Project Details - Member Requirements - Title",
  //   name: "projectDetails.memberReq.title",
  // },
  // {
  //   label: "Project Details - Member Requirements - Description",
  //   name: "projectDetails.memberReq.desc",
  // },
  {
    label: "Development Stage",
    name: "devStage",
    options: devStages,
  },
  {
    label: "Published",
    name: "published",
    type: "checkbox",
  },
  {
    label: "Domains",
    name: "domain",
    multi: true,
    options: projectDomains,
  },
];
// ChunkLoadError: Loading chunk app/layout failed.
// (timeout: http://localhost:3000/_next/static/chunks/app/layout.js)
