import { SvgProps } from "@/types";
import * as React from "react";
const OpenInNew = ({ color = "inherit", size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color}
      fillOpacity={0.549}
      d="M3.125 2.5a.625.625 0 0 0-.625.625v5.75c0 .345.28.625.625.625h5.75c.345 0 .625-.28.625-.625V7a.5.5 0 1 1 1 0v1.875A1.625 1.625 0 0 1 8.875 10.5h-5.75A1.625 1.625 0 0 1 1.5 8.875v-5.75A1.625 1.625 0 0 1 3.125 1.5H5a.5.5 0 1 1 0 1H3.125ZM7 2.5a.5.5 0 1 1 0-1h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V3.207L7.354 5.354a.5.5 0 0 1-.708-.708L8.793 2.5H7Z"
    />
  </svg>
);
export default OpenInNew;
