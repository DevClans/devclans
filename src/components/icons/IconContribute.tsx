import { SvgProps } from "@/types";
import * as React from "react";
const IconContribute = ({
  color = "inherit",
  size,
  width,
  height,
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M13.333 9.333V3.999A1.333 1.333 0 0 0 12 2.666H4a1.333 1.333 0 0 0-1.333 1.333v5.334m10.666 0H2.667m10.666 0 1.036 2.07a1.333 1.333 0 0 1-1.193 1.93H2.825a1.333 1.333 0 0 1-1.194-1.93l1.036-2.07"
    />
  </svg>
);
export default IconContribute;
