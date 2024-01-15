import { IconCollapse, IconExpand } from "@/components";
import colors from "@/lib/colors";
import { ToogleListItemProps } from "@/types/toggleList.types";

const ToggleListItem = ({
  heading,
  data,
  open = false,
}: ToogleListItemProps) => {
  return (
    <>
      <details className="w100" open={open}>
        <summary className="w100 frcsb">
          <p className="text-highlight capitalize font-medium">
            {heading || "Heading"}
          </p>
          <IconCollapse className="hidden showOnOpen" color={colors.subH} />
          <IconExpand className="hideOnOpen" color={colors.subH} />
        </summary>
        <div>
          {data.map((item, i) => (
            <div key={i}>
              <h3 className="text-highlight gap-[5px]">
                {item.title || "title"}
              </h3>
              <p>{item.desc || "some desc"}</p>
            </div>
          ))}
        </div>
      </details>
    </>
  );
};

export default ToggleListItem;
