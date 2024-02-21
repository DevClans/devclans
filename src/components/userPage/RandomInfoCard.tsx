import { InfoWithIconProps } from "@/types/list.types";
import { Space } from "lucide-react";

const RandomInfoCard = ({
  username,
  title,
  desc,
  question,
  ans,
}: Partial<InfoWithIconProps> & {
  username: string;
}) => {
  const t = question || title;
  const d = ans || desc;
  if (!d) {
    return null;
  }
  return (
    <>
      <div className="cardHighlight fcc [&>*]:w-full w100 gap-2">
        <div className="frcsb">
          {t && <h3 className="text-highlight">{t}</h3>}
          {/* <div className="lg:flex items-center gap-1 text-subH hidden lg:visible">
            <Space size={16} />
            <p className="font-medium text-subH text-[10px]">
              Press Space For New Fact
            </p>
          </div> */}
        </div>
        <p>{d}</p>
        {username && <h4 className="text-[11px]">{username}</h4>}
      </div>
    </>
  );
};

export default RandomInfoCard;
