"use client";
import { ButtonProps } from "@/types";
import { ButtonBlue } from ".";
import colors from "@/lib/colors";
import { Github } from "lucide-react";
import { useState } from "react";
import { handleGithubConnect } from "@/utils/handleConnectGithub";

const ButtonConnectGithub = ({ ...props }: Partial<ButtonProps>) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    handleGithubConnect();
    setLoading(false);
  };
  return (
    <>
      <ButtonBlue
        {...props}
        loading={loading}
        label={props.label || "Connect Github"} // Add the 'label' property here
        className="cardGrad lg:max-w-[200px]"
        onClick={handleClick}
        icon={<Github size={16} className="ml-2" color={colors.highlight} />}
      />
    </>
  );
};

export default ButtonConnectGithub;
