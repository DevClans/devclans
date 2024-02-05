import { ButtonProps } from "@/types";
import Link from "next/link";

const Chip = ({
  label,
  href,
  className,
  onClick,
}: { label?: string; href?: string } & ButtonProps) => {
  const newParams = new URLSearchParams();
  const filters = { skills: [label] };
  newParams.set("filters", JSON.stringify(filters));
  return (
    <>
      <Link
        href={href || `/explore?${newParams.toString()}`}
        className={`frc border py-1   ${
          className || "px-2 text-[11px] text-subH  border-border"
        }`}
        onClick={onClick as any}
        style={{
          borderRadius: 10,
          fontWeight: 500,
          textTransform: "capitalize",
        }}
      >
        {label || "Web"}
      </Link>
    </>
  );
};

export default Chip;
