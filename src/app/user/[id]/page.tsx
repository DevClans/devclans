import { LightLine } from "@/components";
import LeftSidebar from "@/components/userPage/LeftSidebar";
import MiddleSection from "@/components/userPage/MiddleSection";
import RightSidebar from "@/components/userPage/RightSidebar";
import { UserProps } from "@/types/mongo/user.types";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const userData: Partial<UserProps> = {
    username: "Damian",
    bio: "I'm a full stack developer, I like to make things.",
  };
  return (
    <>
      <LightLine />
      <LeftSidebar
        username={userData.username || "Username"}
        desc={userData.bio || "You bio goes here"}
      />
      <div className="frfssb peer-data-[state=not-active]:pl-[120px] peer-data-[state=active]:pl-[340px] relative -z-10 w100 container py-6 gap-6">
        {/* middle scroll */}
        <MiddleSection />
        {/* right sidebar */}
        <RightSidebar />
      </div>
    </>
  );
};

export default page;
