"use client";
import { ButtonProps } from "@/types";
import ButtonUserSection from "../buttons/ButtonUserSection";
import { useState } from "react";

const ButtonGroupUserSections = ({
  data,
  containerClassName,
  containerStyle,
  ...rest
}: {
  data: ButtonProps[];
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
} & Partial<ButtonProps>) => {
  const [active, setActive] = useState(0);
  return (
    <>
      <div
        className={
          "frc gap-2 overflow-scroll lg:overflow-auto w-100 scrollbar " +
          containerClassName
        }
        style={containerStyle}
      >
        {data.map((item, i) => (
          <ButtonUserSection
            {...rest}
            active={active === i}
            key={i}
            {...item}
            onClick={() => {
              setActive(i);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ButtonGroupUserSections;
