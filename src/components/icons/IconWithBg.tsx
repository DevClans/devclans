import { SvgProps } from "@/types";

const IconWithBg = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div style={{}} className="p-[10px] card rounded-[5px]">
      {icon}
    </div>
  );
};

export default IconWithBg;
