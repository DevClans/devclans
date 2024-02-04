"use client";
// import colors from "@/lib/colors";
import { ButtonProps } from "@/types";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const ButtonLink = ({
  label,
  className,
  style,
  onClick,
  href,
  disabled = false,
  loading = false,
  replace,
  ...rest
}: ButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const progress = <CircularProgress color="inherit" size={14} />;
  const handleClick = async (e: any) => {
    setClicked(true);
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      await onClick(e, "secondary");
      setClicked(false);
    } else {
      setClicked(false);
    }
  };
  if (href) {
    return (
      <Link
        replace={replace}
        className={`fccc button ${className}`}
        onClick={handleClick}
        style={{ ...style }}
        href={href}
        {...rest}
      >
        {!loading ? label || "Link Button" : progress}
      </Link>
    );
  }
  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={`${className}`}
      onClick={handleClick}
      style={{ ...style }}
    >
      {!loading ? label || "Button" : progress}
    </button>
  );
};

export default ButtonLink;
