"use client";
import { ButtonProps } from "@/types";
import { ArrowRightAltRounded } from "..";

const ButtonBlue = ({ style, className, label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={(e) => onClick && onClick(e, label)}
      className={
        "bg-primary  w100 h-[50px] rounded-[10px] text-sm " + className
      }
      style={style}
    >
      {label}
      <ArrowRightAltRounded fontSize={"medium"} />
    </button>
  );
};

export default ButtonBlue;
