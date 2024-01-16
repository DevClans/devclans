import { BooleanStateProps } from "./state.types";

export type ToogleListItemProps = {
  heading: string;
  open?: boolean;
  data: {
    title: string;
    desc: string;
  }[];
  // icon?: React.ReactNode;
};

export type ProjectDetailsItemProps = {
  heading: string;
  data: string | ToogleListItemProps[];
};

export type ExpandDetailsBoxProps = ToogleListItemProps & {
  icon?: React.ReactNode;
} & BooleanStateProps;
