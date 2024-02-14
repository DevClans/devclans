import { ImageProps } from "@/types";
import { Avatar } from "..";
import ImageComp from "../ImageComp";

const ProductImg = ({
  src,
  alt,
  height,
  width,
  className,
  style,
  fill,
  isAvatar = false,
  isUser = false,
  isVideo,
}: Partial<ImageProps> & {
  src: string;
  isAvatar?: boolean;
  isUser?: boolean;
  isVideo?: boolean;
}) => {
  let imgProps: Partial<ImageProps> = {
    width: width || 428,
    height: height || 255,
  };
  if (fill) {
    imgProps = {
      fill: true,
    };
  }
  const imageProps = {
    src: src,
    className: `card xl:max-h-[255px] xl:max-w-[428px] ${className}`,
    alt: alt || "test",
    ...imgProps,
    style: {
      padding: 5,
      borderRadius: 10,
      aspectRatio: "425/255",
      background:
        "linear-gradient(139deg, rgba(23, 55, 120, 0.30) 1.39%, rgba(25, 55, 113, 0.30) 100%)",
      backdropFilter: "blur(41.04999923706055px)",
      ...style,
    },
  };
  if (isVideo)
    return (
      <iframe
        {...imageProps}
        {...imgProps}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  if (isAvatar) return <Avatar {...imageProps}>{alt}</Avatar>;

  return <ImageComp {...imageProps} isUser={isUser} />;
};

export default ProductImg;
