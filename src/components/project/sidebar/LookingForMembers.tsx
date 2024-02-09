import Image from "next/image";
import BottomBar from "../../TextBars/BottomBar";
import { LinkShare } from "@/components";
import { msgLookingForMember } from "@/lib/constants.messages";
import { urlProject, urlUser } from "@/constants";
import { LookingForMembersProps } from "@/types/mongo/user.types";

const LookingForMembers = ({
  username,
  _id,
  level = "beginner",
  type = "users",
}: LookingForMembersProps) => {
  // console.log("LookingForMembersProps", username, _id, level);
  if (!level) {
    return null;
  }
  return (
    <div className="fcc w100 ">
      <div
        className="relative w100 fccc h-[70px] pl-[90px] pr-3"
        style={{
          background:
            "linear-gradient(270deg, #F7D391 0.1%, rgba(176, 200, 245, 0.93) 99.92%)",
          border: "1px solid var(--border, #132341)",
          borderRadius: "10px 10px 0px 0px",
        }}
      >
        <Image
          src={"/teamwork.png"}
          alt="teamwork"
          //    height={69} width={75}
          fill
          style={{
            maxWidth: 75,
            maxHeight: 69,
          }}
        />
        {/* text */}
        <p className="text-border">
          Looking for
          <span className="font-bold mx-1">{level}</span>
          dev bro
        </p>
      </div>
      {Boolean(_id && username) && (
        <BottomBar
          text={
            <span className="w100">
              Tell cohort friends about this opportunity{" "}
              <LinkShare
                url={type == "users" ? urlUser(_id) : urlProject(_id)}
                message={msgLookingForMember(username, level)}
              />
            </span>
          }
        />
      )}
    </div>
  );
};

export default LookingForMembers;
