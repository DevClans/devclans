import {
  ToogleListItemProps,
  ProjectDetailsItemProps,
} from "@/types/toggleList.types";
import { ToggleListItem } from "@/components";

const ProjectDetailsItem = ({
  heading,
  data,
  headingClass,
}: ProjectDetailsItemProps) => {
  const isString = (value: any) =>
    typeof value === "string" || value instanceof String;
  return (
    <div className="w100 gap-[10px] fcfs">
      {heading && (
        <h3 className={" text-[18px] text-highlight " + headingClass}>
          {heading}
        </h3>
      )}
      {isString(data) ? (
        <p>{data as string}</p>
      ) : (
        (data as ToogleListItemProps[]).map((item, index) => (
          <ToggleListItem {...item} key={index} />
        ))
      )}
    </div>
  );
};

export default ProjectDetailsItem;
