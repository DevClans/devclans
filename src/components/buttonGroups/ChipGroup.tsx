import { PageProps } from "@/types/page.types";
import { Chip } from "..";

const ChipGroup = ({
  arr,
  searchParams,
}: { arr: string[] } & Partial<PageProps>) => {
  const newParams = new URLSearchParams(
    Object.entries(searchParams || {}).map(([key, value]) => [
      key,
      String(value),
    ])
  );
  console.log("searchParams in chipgroup", searchParams, newParams);
  return (
    <>
      <div className="frc gap-2 flex-wrap">
        {arr?.map((tech, i) => {
          const hasQueryParams = newParams.toString().length > 0;
          let hreff = "/explore?label=" + tech;
          if (hasQueryParams) {
            newParams.set("label", tech);
            hreff = "/explore?" + newParams.toString();
          }
          return <Chip key={i} label={tech} href={hreff} />;
        })}
      </div>
    </>
  );
};

export default ChipGroup;
