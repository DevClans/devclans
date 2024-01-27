import FilterMenu from "@/components/FilterMenu";
import HeroExplore from "@/components/explore/HeroExplore";
import { PageProps } from "@/types/page.types";

const layout = ({
  children,
  ...rest
}: { children: React.ReactNode } & PageProps) => {
  return (
    <>
      <HeroExplore />
      <div className="container py-[30px] h-max gap-[30px] frfssb">
        {children || <h3>Searching...</h3>}
        <FilterMenu {...rest} />
      </div>
      {/* filter results */}
    </>
  );
};

export default layout;
