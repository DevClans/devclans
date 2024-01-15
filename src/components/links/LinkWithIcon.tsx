import colors from "@/lib/colors";
import Link from "next/link";

const LinkWithIcon = ({
  text,
  icon,
  isBold = false,
  href,
  fontSize,
}: {
  text: string;
  icon?: React.ReactNode;
  isBold?: boolean;
  href: string;
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
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        ...commonStyle,
        ...(isBold ? boldStyle : normalStyle),
      }}
      className="frc gap-[3px]"
    >
      {text || "Link"}
      {icon}
    </Link>
  );
};

export default LinkWithIcon;
