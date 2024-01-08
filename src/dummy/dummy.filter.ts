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
export const dummyFilterSteps: FilterSidebarGrpProps[] = [
  {
    title: "Which year?",
    data: yearsFilter,
    // type: "slider",
    maxValue: 2028,
    minValue: 2020,
    step: 1,
    marks: true,
    defaultValue: 2024,
    heading: "Year",
    key: "year",
  },
  {
    title: "Semester?",
    data: semsFilter,
    // type: "slider",
    maxValue: 8,
    minValue: 1,
    step: 1,
    marks: true,
    defaultValue: 1,
    heading: "Semester",
    key: "semester",
  },
  { title: "University?", data: universitysFilter, key: "university" },
];
