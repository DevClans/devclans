"use client";
import { ExpandDetailsBoxProps } from "@/types/toggleList.types";
import { IconCollapse, IconExpand, IconReadme } from "@/components";
import colors from "@/lib/colors";
import { sanitizeReadme } from "@/utils/sanitizeReadme";
import { useEffect, useState } from "react";

// import { useMemo } from "react";
const ExpandDetailsBox = ({
  heading,
  data,
  icon,
  isActive,
  setActive,
  title,
}: ExpandDetailsBoxProps & { title: string }) => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    sanitizeReadme(data).then(async (res) => {
      if (res) {
        setMarkdown(res);
      }
    });
  }, [data]);
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
      <div className={`p-5 ${isActive ? "pt-0" : ""}`}>
        {isActive ? (
          markdown ? (
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: markdown }}
            />
          ) : (
            <p className="pt-2">No data found</p>
          )
        ) : (
          <>
            <p className="">
              <span className="capitalize">{heading}</span> file of{" "}
              <span className="capitalize">{title}</span>{" "}
            </p>
            <p className="text-highlight mt-1">Expand for more details</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandDetailsBox;
