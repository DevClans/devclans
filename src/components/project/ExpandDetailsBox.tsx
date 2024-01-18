"use client";
import { ExpandDetailsBoxProps } from "@/types/toggleList.types";
import { IconCollapse, IconExpand, IconReadme } from "@/components";
import colors from "@/lib/colors";
import ReactMarkdown from "react-markdown";
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
      <div className={`p-5 ${isActive ? "pt-0" : ""}`}>
        {isActive ? (
          <ReactMarkdown className={`markdown`}>{data}</ReactMarkdown>
        ) : (
          <>
            {/* <ReactMarkdown>{data.substring(0, 100)}</ReactMarkdown>
            <p className=" text-highlight mt-1">Expand for more details</p> */}
            <p className="">
              <span className="capitalize">{heading}</span> of projectname{" "}
            </p>
            <p className="text-highlight mt-1">Expand for more details</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandDetailsBox;
