"use client";
import { ButtonProps } from "@/types/button.types";
import IconAll from "../icons/IconAll";

const ButtonCategory = ({
  icon = <IconAll />,
  label,
  active,
  onClick,
}: ButtonProps) => {
  const color = active ? "var(--primary)" : "var(--text)";
  return (
    <button
      className={`fcc ${active && "card"} rounded-[20px] gap-1`}
      onClick={(e) => onClick && onClick(e, label)}
      style={{
        padding: "10px 20px",
        color: color,
        fill: color,
        stroke: color,
      }}
    >
      {icon}
      <p
        className="text-nowrap"
        style={{ textWrap: "nowrap", color, fontWeight: active ? 600 : 400 }}
      >
        {label}
      </p>
    </button>
  );
};

export default ButtonCategory;
