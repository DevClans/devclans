import { SvgProps } from "@/types/img.types";
import * as React from "react";

const IconCode = ({ color = "inherit", size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width || "20"}
    height={height || "20"}
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color}
      fillOpacity={0.549}
      d="M5.9 7.596 3.014 10 5.9 12.405a.937.937 0 1 1-1.2 1.44L.95 10.72a.937.937 0 0 1 0-1.44L4.7 6.155a.937.937 0 0 1 1.2 1.44ZM19.65 9.28 15.9 6.155a.938.938 0 1 0-1.2 1.44L17.586 10 14.7 12.405a.936.936 0 0 0 .513 1.659.938.938 0 0 0 .687-.219l3.75-3.125a.937.937 0 0 0 0-1.44Zm-6.53-7.036a.938.938 0 0 0-1.201.56l-5 13.75a.937.937 0 0 0 1.762.642l5-13.75a.938.938 0 0 0-.56-1.202Z"
    />
  </svg>
);
export default IconCode;
