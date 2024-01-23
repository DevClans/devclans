"use client";
import { ButtonProps } from "@/types";
import ButtonLink from "./ButtonLink";

const ButtonSecondary = ({
  label,
  className,
  style,
  onClick,
  href,
}: ButtonProps) => {
  return (
    <ButtonLink
      onClick={(e) => onClick && onClick(e, "secondary")}
      style={{ ...style }}
      label={label || "Button"}
      href={href}
      className={`text-sm border-text w100 rounded-[10px] py-2  border ${className}`}
    />
  );
};

export default ButtonSecondary;
