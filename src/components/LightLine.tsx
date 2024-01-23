import colors from "@/lib/colors";

const LightLine = ({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-full h-[1px] ${className}`}
      style={{
        backgroundColor: color || colors.border,
      }}
    />
  );
};

export default LightLine;
