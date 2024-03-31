export type ListItemProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: (text: string) => Promise<any>;
  text: string;
  href?: string;
};
export type ListProjectProps = ListItemProps & {
  desc: string;
  skills: string[];
  imgs: string[];
};
export type SidebarListProps = {
  heading: string;
  list: ListItemProps[];
  onlyList?: boolean;
  needIconBg?: boolean;
  className?: string;
};

export type InfoWithIconProps = {
  icon: React.ReactNode;
  question?: string;
  desc: string;
  ans?: string;
  title: string;
};
