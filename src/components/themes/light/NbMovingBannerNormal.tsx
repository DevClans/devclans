const NbMovingBannerNormal = ({
  rowCount = 2,
  colCount = 3,
  text,
  type = 1,
  className,
  textBetween = "🔗",
}: {
  rowCount?: number;
  colCount?: number;
  text: string;
  className?: string;
  type?: 0 | 1;
  textBetween?: string | string[];
}) => {
  const isHeading = type === 1;
  if (!text) {
    return null;
  }
  return (
    <div
      className={`${className} max-w-screen overflow-hidden ${
        isHeading
          ? "text-white py-2 lg:py-2 fade-in sticky  top-0 z-20 border-nbDark border-2"
          : "bgText"
      }`}
    >
      {Array.from({ length: rowCount }).map((_, i) => (
        <div className={`${"moveLeft"} w-full flex flex-nowrap`} key={i}>
          {Array.from({ length: colCount }).map((_, index) => (
            <span
              className={`
                 uppercase ${
                   isHeading
                     ? "font-black text-base lg:text-2xl flex-shrink-0 text-nbDark"
                     : "lg:text-[130px] lg:leading-[101px]"
                 }`}
              key={index}
            >
              {text}
              {isHeading && (
                <span
                  className=" text-lg  lg:text-2xl mx-2"
                  style={{
                    WebkitTextStrokeWidth: 2,
                    WebkitTextStrokeColor: "#FFF",
                  }}
                >
                  {textBetween && Array.isArray(textBetween)
                    ? textBetween[index % textBetween.length]
                    : textBetween}
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NbMovingBannerNormal;
