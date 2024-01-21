import { InfoWithIconProps } from "@/types/list.types";
import { Space } from "lucide-react";

const RandomInfoCard = ({
  user,
  title,
  desc,
}: Partial<InfoWithIconProps> & {
  user: string;
}) => {
  return (
    <>
      <div className="cardHighlight fcc [&>*]:w-full w100 gap-2">
        <div className="frcsb">
          <h3 className="text-highlight">{title || "title"}</h3>
          <div className="frc gap-1 text-subH">
            <Space size={16} />
            <p className="font-medium text-subH text-[10px]">
              Press Space For New Fact
            </p>
          </div>
        </div>
        <p>{desc || "some data comes here"}</p>
        <h4 className="text-[11px]">{user || "username"}</h4>
      </div>
    </>
  );
};

export default RandomInfoCard;
