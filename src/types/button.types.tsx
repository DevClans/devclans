export type ButtonProps = {
  label: string | number | React.ReactNode;
  activeLabel?: string | number | React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean | number | string;
  replace?: boolean;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: string | number
  ) => void;
  color?: string;
  href?: string;
  activeIcon?: React.ReactNode;
  setActive?: any;
  // | React.Dispatch<React.SetStateAction<boolean>>
  // | React.Dispatch<React.SetStateAction<string>>
  // | React.Dispatch<React.SetStateAction<number>>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  form?: string;
};
export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};
