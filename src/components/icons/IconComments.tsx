import { SvgProps } from "@/types";
import * as React from "react";
const IconComments = ({ color = "inherit", size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color}
      d="M8.011 0a7.98 7.98 0 0 0-5.649 2.343A8.005 8.005 0 0 0 .022 8a7.918 7.918 0 0 0 1.806 5.063l-1.598 1.6a.8.8 0 0 0-.168.872.8.8 0 0 0 .76.464h7.19c2.118 0 4.15-.843 5.648-2.343a8.006 8.006 0 0 0 0-11.313A7.983 7.983 0 0 0 8.011 0Zm0 14.4H2.747l.743-.745a.8.8 0 0 0 0-1.128 6.403 6.403 0 0 1 2.657-10.65 6.383 6.383 0 0 1 7.493 3.102 6.407 6.407 0 0 1-1.576 7.965 6.386 6.386 0 0 1-4.053 1.455Z"
    />
  </svg>
);
export default IconComments;
