import { IconCollapse, IconExpand } from "@/components";
import colors from "@/lib/colors";
import { ToogleListItemProps } from "@/types/toggleList.types";

const ToggleListItem = ({
  heading,
  data,
  open = false,
  className,
  style,
}: ToogleListItemProps) => {
  return (
    <>
      <details className={`w100 ${className}`} style={style} open={open}>
        <summary className="w100 frcsb">
          <p className="text-highlight capitalize font-medium">
            {heading || "Heading"}
          </p>
          <IconCollapse className="hidden showOnOpen" color={colors.subH} />
          <IconExpand className="hideOnOpen" color={colors.subH} />
        </summary>
        <div
          className="markdown p-5"
          style={{
            gap: "20px",
          }}
        >
          {data.map(({ title, desc }, i) => (
            <div key={i} className="markdown">
              {title && <h3 className="text-highlight gap-[5px]">{title}</h3>}
              {desc && <p>{desc}</p>}
            </div>
          ))}
        </div>
      </details>
    </>
  );
};

export default ToggleListItem;
