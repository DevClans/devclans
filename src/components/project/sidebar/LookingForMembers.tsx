import Image from "next/image";
import BottomBar from "../../TextBars/BottomBar";
import { LinkShare } from "@/components";
import { msgLookingForMember } from "@/lib/constants.messages";
import { urlUser } from "@/constants";
import { Types } from "mongoose";

const LookingForMembers = () => {
  const username = "test";
  const id: Types.ObjectId = "123" as unknown as Types.ObjectId;
  const level = "beginner";
  return (
    <div className="fcc w100">
      <div
        className="relative w100 fccc h-[70px]"
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
          hello
          <span className="font-semibold">wowo</span>
        </p>
      </div>
      <BottomBar
        text={
          <>
            Tell cohort friends about this opportunity{" "}
            <LinkShare
              url={urlUser(id)}
              message={msgLookingForMember(username, level)}
            />
          </>
        }
      />
    </div>
  );
};

export default LookingForMembers;
