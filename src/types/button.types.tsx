export type ButtonProps = {
  label: string;
  style?: React.CSSProperties;
  className?: string;
};
export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};
