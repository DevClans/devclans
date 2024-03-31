import { ListItemProps } from "./list.types";

export type ThemeType = {
  avatar: string;
  displayName: string;
  username: string;
  links: (string | ListItemProps)[];
  projectLinks: (string | ListItemProps)[];
};
