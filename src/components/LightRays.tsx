import Image from "next/image";

const LightRays = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <>
      {/* LIGHT RAYS */}
      <div
        style={{
          zIndex: -1,
          ...style,
        }}
      >
        <Image
          priority
          src={"/homeHeroBg.png"}
          alt="home background"
          style={{ maxHeight: 840 }}
          fill
        />
      </div>
    </>
  );
};

export default LightRays;
