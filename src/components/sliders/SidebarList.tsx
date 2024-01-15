import { SidebarListProps } from "@/types/list.types";
import IconWithBg from "../icons/IconWithBg";
import { IconButton } from "@mui/material";
import Link from "next/link";

const SidebarList = ({ heading, list }: SidebarListProps) => {
  return (
    <div className="gradCard p-5 gap-[10px] fcc w100">
      <h4 className="w100">{heading}</h4>
      {list?.map(
        (item, i) => (
          (<>{i != 0 && <div key={i + 1} className="borderLine w100" />}</>),
          (
            <div
              key={i}
              className="frcsb gap-[10px] w100"
              style={{ color: "var(--text)" }}
            >
              <Link
                href={item.text}
                className="frc gap-[10px] hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWithBg icon={item.startIcon} />
                <p className=" text-xs ">{item.text}</p>
              </Link>
              <IconButton>{item.endIcon}</IconButton>
            </div>
          )
        )
      )}
    </div>
  );
};

export default SidebarList;
