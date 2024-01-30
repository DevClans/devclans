"use client";
import { ButtonProps } from "@/types";
import Link from "next/link";

const ButtonLink = ({
  label,
  className,
  style,
  onClick,
  href,
  replace,
  ...rest
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        replace={replace}
        className={`fccc button ${className}`}
        onClick={(e) => onClick && onClick(e, "secondary")}
        style={{ ...style }}
        href={href}
        {...rest}
      >
        {label || "Link Button"}
      </Link>
    );
  }
  return (
    <button
      {...rest}
      className={`${className}`}
      onClick={(e) => onClick && onClick(e, "secondary")}
      style={{ ...style }}
    >
      {label || "Button"}
    </button>
  );
};

export default ButtonLink;
