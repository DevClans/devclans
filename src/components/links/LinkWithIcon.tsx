import colors from "@/lib/colors";
import { LinkWithIconProps } from "@/types";
import Link from "next/link";

const LinkWithIcon = ({
  text,
  target,
  icon,
  isBold = false,
  href,
  fontSize,
  iconLeft,
  color,
}: LinkWithIconProps) => {
  const commonStyle: React.CSSProperties = {
    fontSize: fontSize || 12,
    textDecorationLine: "underline",
    textTransform: "capitalize",
  };
  const boldStyle: React.CSSProperties = {
    color: color || colors.primary,
    fontWeight: 600,
  };
  const normalStyle: React.CSSProperties = {
    color: color || colors.text,
    fontWeight: 400,
  };
  const props = {
    style: {
      display: "inline-flex",
      ...commonStyle,
      ...(isBold ? boldStyle : normalStyle),
    },
    className: "frc gap-[3px]",
  };
  const innerHtml = (
    <>
      {iconLeft}
      {text || "Link"}
      {icon}
    </>
  );
  if (!href) {
    return <div {...props}>{innerHtml}</div>;
  }
  return (
    <Link href={href} target={target} {...props}>
      {innerHtml}
    </Link>
  );
};

export default LinkWithIcon;
