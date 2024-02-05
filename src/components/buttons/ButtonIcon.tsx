"use client";
import { ButtonProps } from "@/types";

const ButtonIcon = ({
  icon,
  label,
  onClick,
  color = "var(--text)",
  active,
  activeIcon,
  setActive,
  className,
  style,
  disabled
}: Partial<ButtonProps>) => {
  const labelString = label?.toString();
  return (
    <button
      disabled={disabled}
      className={`frc card rounded-[10px] gap-[5px] ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick(e, labelString || "");
        } else if (setActive) {
          setActive(!active);
        }
      }}
      style={{
        boxShadow: "none",
        padding: "5px 12px",
        color,
        ...style,
      }}
    >
      {active ? activeIcon : icon}
      {labelString && labelString != "0" && (
        <p
          className="text-nowrap"
          style={{ textWrap: "nowrap", color, fontWeight: 600 }}
        >
          {label}
        </p>
      )}
    </button>
  );
};

export default ButtonIcon;
