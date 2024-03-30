import Image from "next/image";

const LightRays = ({
  style,
  opacity = 0.3,
  className,
  imgClassName,
}: {
  style?: React.CSSProperties;
  opacity?: number;
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <>
      {/* LIGHT RAYS */}
      <div
        className={className}
        style={{
          zIndex: -100,
          ...style,
        }}
      >
        <Image
          priority
          className={imgClassName}
          id="lightRays"
          src={"/homeHeroBg.png"}
          alt="home background"
          style={{ maxHeight: style ? "none" : 840, opacity }}
          fill
        />
      </div>
    </>
  );
};

export default LightRays;
