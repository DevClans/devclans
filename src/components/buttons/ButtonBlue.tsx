"use client";
import { ButtonProps } from "@/types";
import { ArrowRightAltRounded } from "..";
import ButtonLink from "./ButtonLink";

const ButtonBlue = ({ className, label, disabled, ...props }: ButtonProps) => {
  return (
    <ButtonLink
      className={
        "bg-primary gap-y-0 frc flex-wrap px-1 w100 /h-[50px] py-2 rounded-[10px] text-sm " +
        className
      }
      label={
        <>
          {label}
          {!disabled && <ArrowRightAltRounded fontSize={"medium"} />}
        </>
      }
      disabled={disabled}
      {...props}
    />
  );
};

export default ButtonBlue;
