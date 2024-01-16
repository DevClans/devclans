"use client";
import { ExpandDetailsBoxProps } from "@/types/toggleList.types";
import { IconCollapse, IconExpand, IconReadme } from "@/components";
import colors from "@/lib/colors";

const ExpandDetailsBox = ({
  heading,
  data,
  icon,
  isActive,
  setActive,
}: ExpandDetailsBoxProps) => {
  return (
    <div className="card2 w100 border-t-0">
      <summary
        onClick={() => {
          setActive(!isActive);
        }}
        className="w100 frcsb gap-2"
      >
        <div className="w100 frc gap-2">
          {icon || <IconReadme color={colors.text} />}
          <h5>{heading || "Heading"}</h5>
        </div>
        {isActive ? (
          <IconCollapse className="" color={colors.subH} />
        ) : (
          <IconExpand className="" color={colors.subH} />
        )}
      </summary>
      <div className="px-5 py-[10px]">
        {isActive ? (
          data.map((item, i) => (
            <div key={i}>
              <h3 className="text-highlight gap-[5px]">
                {item.title || "title"}
              </h3>
              <p>{item.desc || "some desc"}</p>
            </div>
          ))
        ) : (
          <p>{"some data"}</p>
        )}
      </div>
    </div>
  );
};

export default ExpandDetailsBox;
