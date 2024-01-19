import { ImageProps } from "@/types";
import Image from "next/image";

const ProductImg = ({
  src,
  alt,
  height,
  width,
}: Partial<ImageProps> & { src: string }) => {
  return (
    <Image
      src={src || "/homeHero.png"}
      className="card max-h-[255px] max-w-[428px]"
      alt={alt || "test"}
      width={width || 428}
      height={height || 255}
      style={{
        padding: 5,
        borderRadius: 10,
        background:
          "linear-gradient(139deg, rgba(23, 55, 120, 0.30) 1.39%, rgba(25, 55, 113, 0.30) 100%)",
        backdropFilter: "blur(41.04999923706055px)",
      }}
    />
  );
};

export default ProductImg;
