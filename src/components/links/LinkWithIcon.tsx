import colors from "@/lib/colors";
import Link from "next/link";

const LinkWithIcon = ({
  text,
  target,
  icon,
  isBold = false,
  href,
  fontSize,
}: {
  target?: string;
  text: string;
  icon?: React.ReactNode;
  isBold?: boolean;
  href?: string;
  fontSize?: number;
}) => {
  const commonStyle: React.CSSProperties = {
    fontSize: fontSize || 12,
    textDecorationLine: "underline",
    textTransform: "capitalize",
  };
  const boldStyle: React.CSSProperties = {
    color: colors.primary,
    fontWeight: 600,
  };
  const normalStyle: React.CSSProperties = {
    color: colors.text,
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
