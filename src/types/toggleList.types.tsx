import { FetchProjectDetailsItemProps } from "./mongo/project.types";
import { BooleanStateProps } from "./state.types";

export type ToogleListItemProps = {
  heading: string; // heading like challenge name, or future goal name
  open?: boolean;
  data: {
    title?: string; // title like desc,solution,needHelp
    desc?: string; // desc like desc,solution,needHelp
  }[]; // title like desc,solution,needHelp
  // data: Omit<FetchProjectDetailsItemProps, "solution" | "needHelp">; // title like desc,solution,needHelp
};

export type ProjectDetailsItemProps = {
  heading?: string; // heaing like challenges, problem we solve
  headingClass?: string;
  data: string | ToogleListItemProps[];
};

export type ExpandDetailsBoxProps = ProjectDetailsItemProps & {
  icon?: React.ReactNode;
  data: string;
} & BooleanStateProps;
