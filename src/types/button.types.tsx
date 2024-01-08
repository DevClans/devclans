export type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => void;
};
export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};
