import { ImgProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const LogoIcon = ({ width, height, style, className }: ImgProps) => {
  return (
    <>
      <Image
        src={"/logoIcon.png"}
        priority={true}
        alt="devclans logo"
        width={width || 30}
        height={height || 30}
        style={style}
        className={className}
      />
    </>
  );
};

export default LogoIcon;
