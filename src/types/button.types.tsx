export type ButtonProps = {
  label: string | number;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => void;
  color?: string;
  activeIcon?: React.ReactNode;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};
export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};
