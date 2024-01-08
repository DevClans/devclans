"use client";
import { useState } from "react";
import IconAll from "../icons/IconAll";
import ButtonCategory from "../buttons/ButtonCategory";
import IconAndroid from "../icons/IconAndroid";
import IconWeb from "../icons/IconWeb";
import IconML from "../icons/IconML";
import IconCode from "../icons/IconCode";
import IconSystemDesign from "../icons/IconSystemDesign";

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
  const [active, setActive] = useState<string>("All");
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    setActive(label);
  };
  return (
    <div className="btnRow">
      {dummyCategories.map((category) => (
        <ButtonCategory
          key={category.label}
          icon={category.icon}
          label={category.label}
          active={active === category.label}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default ButtonGroupCategory;
