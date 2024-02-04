"use client";
import { ButtonBlue } from "@/components";
import { useState } from "react";
import useModalConnect from "../modals/useModelConnect";
import { ContactDetailsProps } from "@/types/mongo/user.types";
import { ButtonProps } from "@/types";

const ButtonConnect = ({
  label,
  style,
  className,
  contact,
}: Partial<ButtonProps> & { contact: ContactDetailsProps[] }) => {
  const [open, setOpen] = useState(false);
  const team: ContactDetailsProps[] = contact || [];
  const { handleOpen, Modal } = useModalConnect({ isActive: open, team });
  return (
    <>
      <ButtonBlue
        style={{ ...style }}
        onClick={handleOpen}
        className={`h-11 ${className}`}
        label={label || "Ask a question to Member(s)"}
      />
      <Modal text="" />
    </>
  );
};

export default ButtonConnect;
