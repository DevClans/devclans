import { projectDomains } from "@/lib/domains";
import { skills } from "@/lib/skills";
import { FilterSidebarGrpProps } from "@/types";

export const semsFilter = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "7" },
  { label: "8" },
];

export const yearsFilter = [
  { label: "2020" },
  { label: "2021" },
  { label: "2022" },
  { label: "2023" },
  { label: "2024" },
  { label: "2025" },
  { label: "2026" },
  { label: "2027" },
  { label: "2028" },
];
export const universitysFilter = [{ label: "SRM University" }];
// export const dummyFilterSteps: FilterSidebarGrpProps[] = [
// slider example
//   {
//     title: "Which year?",
//     data: yearsFilter,
//     // type: "slider",
//     maxValue: 2028,
//     minValue: 2020,
//     step: 1,
//     marks: true,
//     defaultValue: 2024,
//     heading: "Year",
//     key: "year",
//   },
//   { title: "University?", data: universitysFilter, key: "university" },
// ];
export const dummyFilterSteps: FilterSidebarGrpProps[] = [
  {
    title: "Domain",
    data: projectDomains as unknown as string[],
    key: "university",
  },
  {
    title: "Skills",
    data: skills as unknown as string[],
    key: "skills",
  },
];
