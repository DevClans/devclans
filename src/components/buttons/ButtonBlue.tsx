"use client";
import { ButtonProps } from "@/types";
import { ArrowRightAltRounded } from "..";

const ButtonBlue = ({
  style,
  className,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={(e) => onClick && onClick(e, label as string)}
      className={
        "bg-primary gap-y-0 frc flex-wrap px-4 w100 h-[50px] rounded-[10px] text-sm " +
        className
      }
      style={style}
    >
      {label}
      <ArrowRightAltRounded fontSize={"medium"} />
    </button>
  );
};

export default ButtonBlue;
