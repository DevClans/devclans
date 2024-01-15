import { SvgProps } from "@/types";
import * as React from "react";
const IconExpand = ({
  color = "inherit",
  size,
  width,
  height,
  className,
  style,
}: SvgProps) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color}
      d="M1 1c-.553 0-1 .447-1 1v3a.999.999 0 1 0 2 0V3h2a.999.999 0 1 0 0-2H1Zm1 10a.999.999 0 1 0-2 0v3c0 .553.447 1 1 1h3a.999.999 0 1 0 0-2H2v-2Zm8-10a.999.999 0 1 0 0 2h2v2a.999.999 0 1 0 2 0V2c0-.553-.447-1-1-1h-3Zm4 10a.999.999 0 1 0-2 0v2h-2a.999.999 0 1 0 0 2h3c.553 0 1-.447 1-1v-3Z"
    />
  </svg>
);
export default IconExpand;
