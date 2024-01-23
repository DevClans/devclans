import XIcon from "@mui/icons-material/X";
const IconTwitter = ({ className }: { className?: string }) => {
  return (
    <div
      className={"rounded-[40px] " + className}
      style={{
        border: "1px solid var(--border, #132341)",
      }}
    >
      <XIcon />
    </div>
  );
};

export default IconTwitter;
