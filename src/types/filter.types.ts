import { zodFilterQuery } from "@/zod/zod.common";
import { ButtonProps } from "./button.types";
import { SliderProps } from "./slider.types";
import { z } from "zod";

export type FilterCheckboxListProps = {
  [key: string]: ButtonProps[];
};

export type FilterChipProps = {
  label: string;
  key: string;
};
export type FilterChipMap = { [key: string]: Record<string, boolean> };

export type FilterSidebarProps = {
  data: FilterSidebarGrpProps[];
  filters: FilterChipMap;
  addFilter: (chip: FilterChipProps) => void;
  removeFilter: (chip: FilterChipProps) => void;
};
export type FilterSidebarGrpProps = { key: string } & (
  | ({
      title?: string;
      data?: ButtonProps[];
      type: "slider";
    } & SliderProps)
  | ({
      title: string;
      data: ButtonProps[];
      type?: "checkbox";
    } & Partial<SliderProps>)
);

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Year = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028;
export type University = "SRM University";

export type FilterQuery = z.infer<typeof zodFilterQuery>;
