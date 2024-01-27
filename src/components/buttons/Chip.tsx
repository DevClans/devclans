import colors from "@/lib/colors";
import Link from "next/link";

const Chip = ({ label, href }: { label?: string; href?: string }) => {
  const newParams = new URLSearchParams();
  const filters = { skills: [label] };
  newParams.set("filters", JSON.stringify(filters));
  return (
    <>
      <Link
        href={href || `/explore?${newParams.toString()}`}
        className="frc"
        style={{
          borderRadius: 10,
          border: "1px solid var(--border, #132341)",
          color: colors.subH,
          fontSize: 11,
          fontWeight: 500,
          padding: "5px 9px",
          textTransform: "capitalize",
        }}
      >
        {label || "Web"}
      </Link>
    </>
  );
};

export default Chip;
