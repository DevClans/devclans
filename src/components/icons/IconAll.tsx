import { SvgProps } from "@/types/img.types";
import * as React from "react";
const IconAll = ({ color, size, width, height, active }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width || "20"}
    height={height || "20"}
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      stroke={color || (active ? "var(--primary)" : "var(--text)")}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M10 6.084c4.603 0 8.334-1.12 8.334-2.5s-3.731-2.5-8.334-2.5c-4.602 0-8.333 1.12-8.333 2.5s3.731 2.5 8.333 2.5Z"
    />
    <path
      stroke={color || (active ? "var(--primary)" : "var(--text)")}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M4.488 5.459c-1.73.458-2.821 1.128-2.821 1.875 0 1.38 3.73 2.5 8.333 2.5s8.334-1.12 8.334-2.5c0-.747-1.092-1.417-2.821-1.875-1.47.389-3.4.625-5.513.625s-4.043-.236-5.512-.625Z"
    />
    <path
      stroke={color || (active ? "var(--primary)" : "var(--text)")}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M4.488 9.209c-1.73.458-2.821 1.128-2.821 1.875 0 1.38 3.73 2.5 8.333 2.5s8.334-1.12 8.334-2.5c0-.747-1.092-1.417-2.821-1.875-1.47.389-3.4.625-5.513.625s-4.043-.236-5.512-.625Z"
    />
    <path
      stroke={color || (active ? "var(--primary)" : "var(--text)")}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M4.488 12.959c-1.73.458-2.821 1.128-2.821 1.875 0 1.38 3.73 2.5 8.333 2.5s8.334-1.12 8.334-2.5c0-.747-1.092-1.417-2.821-1.875-1.47.39-3.4.625-5.513.625s-4.043-.236-5.512-.625Z"
    />
  </svg>
);
export default IconAll;
