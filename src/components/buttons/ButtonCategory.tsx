"use client";
import { ButtonProps } from "@/types/button.types";
import IconAll from "../icons/IconAll";
import ButtonLink from "./ButtonLink";

const ButtonCategory = ({
  icon = <IconAll />,
  label,
  active,
  href,
  onClick,
}: ButtonProps) => {
  const color = active ? "var(--primary)" : "var(--text)";
  const buttonProps = {
    className: `fcc ${active ? "card" : ""} rounded-[20px] gap-1`,
    onClick: (e: any) => onClick && onClick(e, label as string),
    style: {
      padding: "10px 20px",
      color: color,
      fill: color,
      stroke: color,
    },
  };
  return (
    <ButtonLink
      href={href || `/explore?category=${label}`}
      label={
        <>
          {icon}
          <p
            className="text-nowrap"
            style={{
              textWrap: "nowrap",
              color,
              fontWeight: active ? 600 : 400,
            }}
          >
            {label}
          </p>
        </>
      }
      {...buttonProps}
    />
  );
};

export default ButtonCategory;
