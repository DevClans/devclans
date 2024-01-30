"use client";
import { ExpandDetailsBox, IconContribute, IconReadme } from "@/components";
import colors from "@/lib/colors";
import { ProjectFilesProps } from "@/types/mongo/project.types";
import { ExpandDetailsBoxProps } from "@/types/toggleList.types";
import { useState } from "react";

const AboutTheRepo = ({ readme, contributing }: ProjectFilesProps) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const anyOpen = open || open1;
  const items: ExpandDetailsBoxProps[] = [
    {
      heading: "readme.md",
      data: readme,
      isActive: open,
      icon: <IconReadme color={colors.text} />,
      setActive: setOpen,
    },
    {
      heading: "Contribute.md",
      data: contributing,
      isActive: open1,
      icon: <IconContribute color={colors.text} />,
      setActive: setOpen1,
    },
  ];
  return (
    <div className="card2 p-5 w100 ">
      <h2 className="mb-5">About the repo</h2>
      <div className="fcfs w100">
        <div className={`${anyOpen ? "fcc" : "lg:frfssb fcc"} w100 gap-5`}>
          {items.map((item, i) => (
            <ExpandDetailsBox {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutTheRepo;
