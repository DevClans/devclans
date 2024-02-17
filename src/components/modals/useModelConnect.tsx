"use client";
import {
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { ButtonBlue } from "..";
import colors from "@/lib/colors";
import { contactMethodsMap } from "@/lib/contactMethods";
import { ModalConnectProps } from "@/types/modal.types";
import { ContactDetailsProps } from "@/types/mongo/user.types";
import ButtonClose from "../buttons/ButtonClose";

const useModalConnect = ({ isActive = false, team }: ModalConnectProps) => {
  const [open, setOpen] = useState(isActive);
  const [selectedUser, setSelectedUser] = useState<ContactDetailsProps>();
  const handleSend = (user: ContactDetailsProps) => {
    console.log("connecting to user =>", user);
    const a =
      user &&
      contactMethodsMap[user.contactMethod || "discord"](user.contactId);
    const newTab = a && window.open(a, "_blank", "noopener,noreferrer");
    if (newTab) {
      newTab.opener = null;
    }
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const ModalComponent = ({ text }: { text: string }) => (
    <Modal onClose={handleClose} open={open} className="fccc">
      <div className="card2 fcfs gap-5 max-w-[380px] max-h-[600px] p-[30px] w100 relative">
        <ButtonClose onClick={handleClose} />
        <h2 className="font-normal ">
          <span className="text-primary font-bold">Connect</span> with the
          user(s) on their
          <span className="text-primary font-bold"> favourite</span> Social
          Media Platforms
        </h2>
        {/* <textarea
          onChange={(e) => {
            debounce(() => handleText(e), 1000)();
          }}
          className="w100 card p-[10px] scrollbar-x rounded-md max-h-[200px]"
        /> */}
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e, value) => {
              if (value) {
                setSelectedUser(JSON.parse(value));
              }
            }}
          >
            {team.map(
              (member, i) =>
                member && (
                  <FormControlLabel
                    value={JSON.stringify(member)}
                    key={i}
                    checked={selectedUser?.name === member.name}
                    className="capitalize"
                    control={<Radio style={{ color: colors.text }} />}
                    label={
                      <p className="text-highlight">
                        {member.name}
                        <span className="text-text ml-1">
                          - {member.contactMethod}
                        </span>
                      </p>
                    }
                  />
                )
            )}
          </RadioGroup>
        </FormControl>
        <ButtonBlue
          label="connect"
          onClick={() => handleSend(selectedUser as ContactDetailsProps)}
        />
      </div>
    </Modal>
  );

  return {
    handleClose,
    handleOpen,
    handleSend,
    Modal: ModalComponent,
  };
};

export default useModalConnect;
