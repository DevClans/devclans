import { FetchProjectDetailsItemProps } from "./mongo/project.types";
import { BooleanStateProps } from "./state.types";

export type ToogleListItemProps = {
  heading: string; // heading like challenge name, or future goal name
  open?: boolean;
  data: Omit<FetchProjectDetailsItemProps, "solution" | "needHelp">; // title like desc,solution,needHelp
};

export type ProjectDetailsItemProps = {
  heading?: string; // heaing like challenges, problem we solve
  data: string | ToogleListItemProps[];
  headingClass?: string;
};

export type ExpandDetailsBoxProps = ProjectDetailsItemProps & {
  icon?: React.ReactNode;
  data: string;
} & BooleanStateProps;
