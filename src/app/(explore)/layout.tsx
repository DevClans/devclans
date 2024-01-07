import FilterMenu from "@/components/FilterMenu";
import HeroExplore from "@/components/explore/HeroExplore";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeroExplore />
      <div className="container py-[30px] frfssb">
        <FilterMenu />
        {children}
      </div>
      {/* filter results */}
    </>
  );
};

export default layout;
