const CfBgCircle = ({ className }: { className?: string }) => {
  return (
    <div
      id="cfHeroCircle"
      className={`absolute h-[170px] left-1/2 -translate-x-1/2 bottom-3 lg:bottom-10 lg:h-[330px] lg:w-[330px] rounded-full w-[170px] ${className}`}
      style={{
        backgroundColor: "var(--cf-purple-circle )",
        backgroundBlendMode: "color-burn",
        mixBlendMode: "color-burn",
      }}
    />
  );
};

export default CfBgCircle;
