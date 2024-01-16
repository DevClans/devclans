import colors from "@/lib/colors";

const LightLine = ({ color }: { color?: string }) => {
  return (
    <div
      className="w100"
      style={{
        backgroundColor: color || colors.border,
        height: "1px",
      }}
    />
  );
};

export default LightLine;
