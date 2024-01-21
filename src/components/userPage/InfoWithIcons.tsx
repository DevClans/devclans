import colors from "@/lib/colors";
import { IconAll } from "..";
import { InfoWithIconProps } from "@/types/list.types";

const InfoWithIcons = ({ icon, title, desc }: InfoWithIconProps) => {
  return (
    <div className="border-border border p-4 rounded-[10px] w100">
      <div className="frfssb gap-2 w100">
        {icon || <IconAll color={colors.subH} />}
        <div className="fcfs gap-1 w100">
          <h5 className="text-subH">{title || "title"}</h5>
          <p className="text-highlight">{desc || "This is a test"}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoWithIcons;
