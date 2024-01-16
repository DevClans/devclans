import { SvgProps } from "@/types";
import * as React from "react";
const IconReadme = ({ color = "inherit", size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "16"}
    height={height || "16"}
    fill="none"
    viewBox={`0 0 ${width || size || 16} ${height || size || 16}`}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M8 5c.5-1.974 2.388-2.982 6.5-3a.498.498 0 0 1 .5.5v9a.5.5 0 0 1-.5.5c-4 0-5.545.807-6.5 2m0-9c-.5-1.974-2.388-2.982-6.5-3a.498.498 0 0 0-.5.5v8.94c0 .308.191.56.5.56 4 0 5.55.813 6.5 2m0-9v9"
    />
  </svg>
);
export default IconReadme;
