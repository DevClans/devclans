"use client";
import { ButtonBlue } from "@/components";
import { useState } from "react";
import useModalConnect from "../modals/useModelConnect";
import { ContactDetailsProps } from "@/types/mongo/user.types";

const ButtonConnect = () => {
  const [open, setOpen] = useState(false);
  const team: ContactDetailsProps[] = [
    {
      name: "kshetez vinayak",
      contactMethod: "telegram",
      contactId: "kshetezvinayak",
    },
    {
      name: "satvik manchanda",
      contactMethod: "telegram",
      contactId: "satvik1769",
    },
    {
      name: "Siddhant S",
      contactMethod: "whatsapp",
      contactId: "+918625008584",
    },
  ];

  const { handleOpen, Modal } = useModalConnect({ isActive: open, team });
  return (
    <>
      <ButtonBlue onClick={handleOpen} label="Ask a question to Member(s)" />
      <Modal text="" />
    </>
  );
};

export default ButtonConnect;
