import colors from "@/lib/colors";

const Chip = ({ label }: { label?: string }) => {
  return (
    <>
      <div
        className="frc"
        style={{
          borderRadius: 10,
          border: "1px solid var(--border, #132341)",
          color: colors.heading,
          fontSize: 11,
          fontWeight: 500,
          padding: "5px 9px",
          textTransform: "capitalize",
        }}
      >
        {label || "Web"}
      </div>
    </>
  );
};

export default Chip;
