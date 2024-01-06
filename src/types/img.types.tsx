export type ImageProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
} & (
  | {
      height: number;
      width: number;
      fill?: boolean;
    }
  | {
      height?: number;
      width?: number;
      fill: boolean;
    }
);

export type IconImageProps = Partial<ImageProps>;

export type SvgProps =
  // React.SVGProps<SVGSVGElement> &
  {
    size?: number;
    height?: number;
    width?: number;
    color?: string;
    active?: boolean;
  };
