import FilterMenu from "@/components/FilterMenu";
import HeroExplore from "@/components/explore/HeroExplore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeroExplore />
      <div className="w100 relative frfssb">
        <div className="container py-[30px] h-max gap-[30px] frfssb">
          {children || <h3>Searching...</h3>}
        </div>
        <FilterMenu />
      </div>
      {/* filter results */}
    </>
  );
};

export default Layout;
