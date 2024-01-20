import FilterMenu from "@/components/FilterMenu";
import HeroExplore from "@/components/explore/HeroExplore";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeroExplore />
      <div className="container py-[30px] h-max gap-[30px] frfssb">
        {children}
        <FilterMenu />
      </div>
      {/* filter results */}
    </>
  );
};

export default layout;
