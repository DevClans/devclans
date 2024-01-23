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

const dummyCategories = [
  {
    icon: <IconAll />,
    label: "All",
  },
  {
    icon: <IconAndroid />,
    label: "Android",
  },
  {
    icon: <IconWeb />,
    label: "Web",
  },
  {
    icon: <IconML />,
    label: "Machine L.",
  },
  {
    icon: <IconCode />,
    label: "Code",
  },
  {
    icon: <IconSystemDesign />,
    label: "System Design",
  },
];
const ButtonGroupCategory = () => {
  const searchParams = useSearchParams();
  // let categories: string[] = (searchParams.get("category") || "")
  //   .split(",")
  //   .filter(Boolean);
  const newParams = new URLSearchParams(searchParams.toString());
  const category = searchParams.get("category") || "";
  // console.log(
  //   searchParams,
  //   categories,
  //   "categories",
  //   newParams,
  //   newParams.toString()
  // )
  const [active, setActive] = useState<string>(category || "All");
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    setActive(label);
  };
  return (
    <div className="btnRow">
      {dummyCategories.map(({ label, icon }) => {
        // const newCategories = categories.includes(label)
        //   ? categories
        //   : [...categories, label];
        // newParams.set("category", newCategories.join(","));
        newParams.set("category", label);
        return (
          <ButtonCategory
            href={`/explore?${newParams.toString()}`}
            key={label}
            icon={icon}
            label={label}
            active={active === label}
            onClick={(e) => handleClick(e as any, label)}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroupCategory;
