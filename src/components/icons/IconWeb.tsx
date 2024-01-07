import { SvgProps } from "@/types/img.types";

const IconWeb = ({ color, size, width, height, active }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width || "20"}
      height={height || "20"}
      viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
    >
      <path
        stroke={color || (active ? "var(--primary)" : "var(--text)")}
        strokeLinejoin="round"
        strokeOpacity={0.549}
        strokeWidth={1.667}
        d="M16.984 1.334H2.817c-.69 0-1.25.56-1.25 1.25v10.833c0 .69.56 1.25 1.25 1.25h14.167c.69 0 1.25-.56 1.25-1.25V2.584c0-.69-.56-1.25-1.25-1.25Z"
      />
      <path
        stroke={color || (active ? "var(--primary)" : "var(--text)")}
        strokeOpacity={0.549}
        strokeWidth={1.667}
        d="M1.567 2.584a1.25 1.25 0 0 1 1.25-1.25h14.167a1.25 1.25 0 0 1 1.25 1.25v3.75H1.567v-3.75Z"
      />
      <path
        fill={color || (active ? "var(--primary)" : "var(--text)")}
        fillOpacity={0.549}
        d="M3.234 3.835a.833.833 0 1 1 1.666 0 .833.833 0 0 1-1.666 0ZM5.734 3.835a.833.833 0 1 1 1.666 0 .833.833 0 0 1-1.666 0Z"
      />
    </svg>
  );
};

export default IconWeb;
