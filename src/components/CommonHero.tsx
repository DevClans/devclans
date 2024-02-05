import { LightLine } from ".";

const CommonHero = ({ heading }: { heading: string }) => {
  return (
    <>
      <LightLine />
      <div className="py-15 w100 commonCard">
        <h1 className="py-2 text-4xl ">{heading}</h1>
      </div>
      <LightLine />
    </>
  );
};

export default CommonHero;
