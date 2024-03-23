import { LookingForMembersProps } from "@/types/mongo/user.types";
import { LookingForMembers } from "..";

const RightSidebar = ({ level, ...props }: LookingForMembersProps) => {
  if (!level) {
    return null;
  }
  return (
    <>
      <div className="fcc xl:min-w-[250px] xl:max-w-[320px] w100 gap-6 max-h-[84vh] xl:sticky xl:top-[40px]">
        <LookingForMembers level={level} {...props} />
      </div>
    </>
  );
};

export default RightSidebar;
