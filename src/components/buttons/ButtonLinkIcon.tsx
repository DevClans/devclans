"use client";
import copyToClipboard from "@/lib/copyToClipboard";
import { IconLink, IconWithBg } from "..";
import { CheckCheck } from "lucide-react";
import colors from "@/lib/colors";
import { useEffect, useState } from "react";

const ButtonLinkIcon = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const onEndIconClick = async (text: string) => {
    await copyToClipboard(text);
  };
  useEffect(() => {
    console.log("isCopied", isCopied);
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);
  return (
    <IconWithBg
      onClick={() => {
        setIsCopied(true);
        onEndIconClick(text);
      }}
    >
      {isCopied ? <CheckCheck color={colors.green} size={20} /> : <IconLink />}
    </IconWithBg>
  );
};

export default ButtonLinkIcon;
