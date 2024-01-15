export type ListItemProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  text: string;
};
export type SidebarListProps = {
  heading: string;
  list: ListItemProps[];
};
