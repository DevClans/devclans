import { LightLine } from ".";

const CommonHero = ({
  heading,
  highlightHeading,
  isLeft = false,
  desc,
}: {
  heading: string;
  isLeft?: boolean;
  desc?: string;
  highlightHeading?: string;
}) => {
  return (
    <>
      <LightLine />
      <div className="py-15 w100 commonCard container">
        <h1 className={`${isLeft ? "text-left" : ""} py-2 text-4xl `}>
          {heading}
          {highlightHeading && (
            <span className="h1Highlight"> {highlightHeading}</span>
          )}
        </h1>
        {desc && (
          <p className={`${isLeft ? "" : "text-center"}  lg:text-left mt-1`}>
            {desc}
          </p>
        )}
      </div>
      <LightLine />
    </>
  );
};

export default CommonHero;
