"use client";
import { ButtonProps } from "@/types";
import { ArrowRightAltRounded } from "..";
import ButtonLink from "./ButtonLink";

const ButtonBlue = ({ className, label, ...props }: ButtonProps) => {
  return (
    <ButtonLink
      className={
        "bg-primary gap-y-0 frc flex-wrap px-4 w100 h-[50px] rounded-[10px] text-sm " +
        className
      }
      label={
        <>
          {label}
          <ArrowRightAltRounded fontSize={"medium"} />
        </>
      }
      {...props}
    />
  );
};

export default ButtonBlue;
