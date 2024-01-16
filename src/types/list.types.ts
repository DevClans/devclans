export type ListItemProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: (text: string) => Promise<void>;
  text: string;
  href?: string;
};
export type SidebarListProps = {
  heading: string;
  list: ListItemProps[];
  onlyList?: boolean;
  needIconBg?: boolean;
};
