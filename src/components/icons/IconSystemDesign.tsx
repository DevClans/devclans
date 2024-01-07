import { SvgProps } from "@/types/img.types";

const IconSystemDesign = ({ color, size, width, height, active }: SvgProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={width || "20"}
        height={height || "20"}
        viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
      >
        <path
          fill={color || (active ? "var(--primary)" : "var(--text)")}
          fillOpacity={0.549}
          d="M15.625 5a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75Zm-3.062 2.5a3.125 3.125 0 1 0 0-1.25h-.688a2.5 2.5 0 0 0-2.5 2.5v2.5a1.25 1.25 0 0 1-1.25 1.25h-.687a3.125 3.125 0 1 0 0 1.25h.687a2.5 2.5 0 0 0 2.5-2.5v-2.5a1.25 1.25 0 0 1 1.25-1.25h.688ZM6.25 13.125a1.875 1.875 0 1 1-3.749 0 1.875 1.875 0 0 1 3.75 0Z"
        />
      </svg>
    </>
  );
};

export default IconSystemDesign;
