import LightRays from "../LightRays";
import SearchBar from "../SearchBar";
import ButtonGroupCategory from "../buttonGroups/ButtonGroupCategory";

const HeroExplore = () => {
  return (
    <div className="w100 heroCard fcc">
      <div className="borderLine" />
      <div className="container flex justify-center items-center flex-col lg:flex-row gap-x-15 gap-y-5 py-[30px]">
        <SearchBar />
        <ButtonGroupCategory />
        {/* <LightRays
          style={{
            position: "absolute",
            //   bottom: 70,
            top: -80,
            height: 208,
            left: 0,
            width: "100%",
            zIndex: -1,
          }}
        /> */}
      </div>
    </div>
  );
};

export default HeroExplore;
