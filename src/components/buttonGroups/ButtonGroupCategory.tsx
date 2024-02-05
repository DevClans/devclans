"use client";
import { useState } from "react";
import IconAll from "../icons/IconAll";
import ButtonCategory from "../buttons/ButtonCategory";
import IconAndroid from "../icons/IconAndroid";
import IconWeb from "../icons/IconWeb";
import IconML from "../icons/IconML";
import IconCode from "../icons/IconCode";
import IconSystemDesign from "../icons/IconSystemDesign";
import { useSearchParams } from "next/navigation";
import { getFilters, toggleFilter } from "@/utils/filterFunctions";

const dummyCategories = [
  {
    icon: <IconAll />,
    label: "all",
  },
  {
    icon: <IconAndroid />,
    label: "android",
  },
  {
    icon: <IconWeb />,
    label: "web",
  },
  {
    icon: <IconML />,
    label: "machine l.",
  },
  {
    icon: <IconCode />,
    label: "code",
  },
  {
    icon: <IconSystemDesign />,
    label: "system design",
  },
];
const ButtonGroupCategory = () => {
  const searchParams = useSearchParams();
  const { filters, newParams } = getFilters(searchParams);
  // let categories: string[] = (searchParams.get("category") || "")
  //   .split(",")
  //   .filter(Boolean);
  const domain = filters["domain"] || [];
  // console.log(
  //   searchParams,
  //   categories,
  //   "categories",
  //   newParams,
  //   newParams.toString()
  // )
  const [active, setActive] = useState<string>(domain[0] || "all");
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    setActive(label);
  };
  return (
    <div className="btnRow">
      {dummyCategories.map(({ label, icon }) => {
        // console.log(label, "label");
        if (label === "all") {
          delete filters["domain"];
          newParams.set("filters", JSON.stringify(filters));
        }
        const { newParams: params } = toggleFilter(
          newParams,
          filters,
          "domain",
          label === "all" ? "" : label
        );
        return (
          <ButtonCategory
            href={`?${params.toString()}`}
            key={label}
            icon={icon}
            label={label}
            active={active?.toLowerCase() === label?.toLowerCase()}
            onClick={(e) => handleClick(e as any, label)}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroupCategory;
