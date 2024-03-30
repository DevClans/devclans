"use client";
import { SidebarListProps } from "@/types/list.types";
import IconWithBg from "../icons/IconWithBg";
import Link from "next/link";

const SidebarList = ({
  heading,
  list,
  onlyList,
  needIconBg = true,
  className,
}: SidebarListProps) => {
  if (!list || (Array.isArray(list) && list.length == 0)) {
    return null;
  }
  const listEle = (
    <div className="p-5 gap-[10px] fcc w100">
      <h3 className="w100">{heading}</h3>
      {list?.map(
        (item, i) =>
          item &&
          ((<>{i != 0 && <div key={i + 1} className="borderLine w100" />}</>),
          (
            <div
              key={i}
              className="frcsb gap-[10px] w100"
              style={{ color: "var(--text)" }}
            >
              <Link
                href={item.href || item.text}
                className="frc gap-[10px] hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.startIcon &&
                  (needIconBg ? (
                    <IconWithBg icon={item.startIcon} />
                  ) : (
                    item.startIcon
                  ))}
                <p className="lg:max-w-[180px] overflow-hidden text-ellipsis">
                  {item.text || item.href}
                </p>
              </Link>
              <div
                onClick={() => {
                  item.onEndIconClick && item.onEndIconClick(item.text);
                }}
              >
                {item.endIcon}
              </div>
            </div>
          ))
      )}
    </div>
  );
  if (onlyList) return listEle;
  return <div className={"cardGrad w100 " + className}>{listEle}</div>;
};

export default SidebarList;
