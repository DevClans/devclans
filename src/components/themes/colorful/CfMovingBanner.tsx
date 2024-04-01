const CfMovingBanner = ({
  rowCount = 2,
  colCount = 3,
  text,
  type = 1,
  className,
}: {
  rowCount?: number;
  colCount?: number;
  text: string;
  className?: string;
  type?: 0 | 1;
}) => {
  const isHeading = type === 1;
  if (!text) {
    return null;
  }
  return (
    <div
      className={`${className} max-w-screen overflow-hidden ${
        isHeading
          ? "bg-cfDark text-white py-4 lg:py-10 fade-in sticky top-0 z-20"
          : "bgText"
      }`}
    >
      {Array.from({ length: rowCount }).map((_, i) => (
        <div
          className={`${
            isHeading
              ? "moveLeftOnScroll"
              : i % 2 == 0
              ? "moveRight"
              : "moveLeft"
          } w-full flex flex-nowrap`}
          key={i}
        >
          {Array.from({ length: colCount }).map((_, index) => (
            <span
              className={`
               uppercase ${
                 isHeading
                   ? "font-semibold text-base lg:text-2xl flex-shrink-0"
                   : "lg:text-[130px] lg:leading-[101px]"
               }`}
              key={index}
            >
              {text}
              {isHeading && (
                <span
                  className="text-cfDark text-lg  lg:text-2xl mx-2"
                  style={{
                    WebkitTextStrokeWidth: 2,
                    WebkitTextStrokeColor: "#FFF",
                  }}
                >
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CfMovingBanner;
