"use client";
import { ButtonProps } from "@/types";

const IconWithBg = ({
  icon,
  children,
  onClick,
}: React.PropsWithChildren & Partial<ButtonProps>) => {
  return (
    <button
      onClick={onClick as any}
      style={{}}
      className="p-[10px] card rounded-[5px]"
    >
      {icon || children}
    </button>
  );
};

export default IconWithBg;
