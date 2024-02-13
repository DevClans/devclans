import { PageProps } from "@/types/page.types";
import { Chip } from "..";
import { getFilters, toggleFilter } from "@/utils/filterFunctions";

const ChipGroup = ({
  arr,
  searchParams,
  className,
  baseUrl = "",
}: {
  arr?: (string | null)[];
  className?: string;
  baseUrl?: string;
} & Partial<PageProps>) => {
  const { filters, newParams } = getFilters(searchParams);
  // console.log("searchParams in chipgroup", searchParams, newParams, baseUrl);
  return (
    <>
      <div className={`${className} frc gap-2 flex-wrap`}>
        {arr?.map((tech, i) => {
          if (!tech) {
            return null;
          }
          const { newParams: params } = toggleFilter(
            newParams,
            filters,
            "skills",
            tech
          );

          let hreff = params && `${baseUrl}?${params.toString()}`;
          return <Chip key={i} label={tech} href={hreff} />;
        })}
      </div>
    </>
  );
};

export default ChipGroup;
