import { ButtonProps } from "@/types";
import Link from "next/link";

const ButtonLink = ({
  label,
  className,
  style,
  onClick,
  href,
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        className={`fccc button ${className}`}
        onClick={(e) => onClick && onClick(e, "secondary")}
        style={{ ...style }}
        href={href}
      >
        {label || "Link Button"}
      </Link>
    );
  }
  return (
    <button
      className={`${className}`}
      onClick={(e) => onClick && onClick(e, "secondary")}
      style={{ ...style }}
    >
      {label || "Button"}
    </button>
  );
};

export default ButtonLink;
