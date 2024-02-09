"use client";
import { ButtonProps } from "@/types";
import { CloseRounded, MuiIconButton } from "..";

const ButtonClose = ({ onClick, className }: Partial<ButtonProps>) => {
  return (
    <>
      <MuiIconButton
        size="small"
        className={className || "z-10 !absolute top-1 right-1"}
        onClick={onClick as any}
      >
        <CloseRounded className="!text-text" />
      </MuiIconButton>
    </>
  );
};

export default ButtonClose;
