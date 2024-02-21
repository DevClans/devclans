"use client";
import MessageWithButton from "./MessageWithButton";
import ButtonConnectGithub from "../buttons/ButtonConnectGithub";

const ConnectToGithub = () => {
  return (
    <>
      <MessageWithButton
        heading="Enhance Your Profile with GitHub Integration"
        desc="Sync your GitHub for an instant profile upgrade. Display your latest activity, stats, and coding journey to dazzle visitors!"
        button={<ButtonConnectGithub />}
      />
    </>
  );
};

export default ConnectToGithub;
