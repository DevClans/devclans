import colors from "@/lib/colors";
import { SvgProps } from "@/types";
import * as React from "react";
const IconLink = ({ color = colors.subH, size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || "20"}
    height={height || "20"}
    fill="none"
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color || "inherit"}
      d="M10.654 14.65a.938.938 0 0 1 0 1.329l-.464.464A4.69 4.69 0 0 1 3.558 9.81l1.885-1.883a4.688 4.688 0 0 1 6.432-.194.94.94 0 1 1-1.25 1.406 2.812 2.812 0 0 0-3.857.115l-1.883 1.881a2.813 2.813 0 0 0 3.978 3.979l.464-.465a.937.937 0 0 1 1.327 0ZM16.44 3.557a4.694 4.694 0 0 0-6.631 0l-.464.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.884a2.813 2.813 0 0 1-3.858.112.94.94 0 1 0-1.25 1.406 4.687 4.687 0 0 0 6.43-.19l1.884-1.883a4.694 4.694 0 0 0 .002-6.634v-.001Z"
    />
  </svg>
);
export default IconLink;
