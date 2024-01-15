import { SvgProps } from "@/types";
import * as React from "react";
const IconCollapse = ({
  color = "inherit",
  size,
  width,
  height,
  className,
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
    className={className}
  >
    <mask
      id="a"
      width={width || "20"}
      height={height || "20"}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M0 0h16v16H0V0Z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill={color}
        fillRule="evenodd"
        d="M15.25 6.993a.75.75 0 1 0 0-1.5H10.5V.75a.75.75 0 1 0-1.5 0v5.493c0 .414.336.75.75.75h5.5ZM.75 9.007a.75.75 0 0 0 0 1.5H5.5v4.743a.75.75 0 1 0 1.5 0V9.757a.75.75 0 0 0-.75-.75H.75Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
export default IconCollapse;
