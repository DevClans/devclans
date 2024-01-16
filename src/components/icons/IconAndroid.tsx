import { SvgProps } from "@/types/img.types";

const IconAndroid = ({ color = "inherit", size, width, height }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width || size || "20"}
    height={height || size || "20"}
    viewBox={`0 0 ${width || size || 20} ${height || size || 20}`}
  >
    <path
      fill={color}
      fillOpacity={0.549}
      d="M16.073 3.422a.834.834 0 0 1 .372 1.117l-.978 1.959a8.324 8.324 0 0 1 3.567 6.836v.833a1.667 1.667 0 0 1-1.667 1.667H4.034a1.667 1.667 0 0 1-1.667-1.667v-.833a8.323 8.323 0 0 1 3.567-6.837l-.978-1.958a.833.833 0 0 1 1.49-.745l.945 1.89A8.306 8.306 0 0 1 10.7 5c1.175 0 2.295.243 3.31.683l.945-1.889a.833.833 0 0 1 1.117-.372ZM10.7 6.667a6.667 6.667 0 0 0-6.666 6.667v.833h13.333v-.833A6.667 6.667 0 0 0 10.7 6.667ZM7.784 10a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm5.833 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
    />
  </svg>
);
export default IconAndroid;
