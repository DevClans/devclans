export type ButtonProps = {
  label: string | number | React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: string | number
  ) => void;
  color?: string;
  href?: string;
  activeIcon?: React.ReactNode;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};
export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};
