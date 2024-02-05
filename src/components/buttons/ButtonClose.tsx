"use client";
import { ButtonProps } from "@/types";
import { CloseRounded, MuiIconButton } from "..";

const ButtonClose = ({ onClick }: Partial<ButtonProps>) => {
  return (
    <>
      <MuiIconButton
        className="z-10 absolute top-1 right-1"
        onClick={onClick as any}
      >
        <CloseRounded className="text-text" />
      </MuiIconButton>
    </>
  );
};

export default ButtonClose;
