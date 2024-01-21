import { LightLine } from "@/components";
import LeftSidebar from "@/components/userPage/LeftSidebar";
import MiddleSection from "@/components/userPage/MiddleSection";
import RightSidebar from "@/components/userPage/RightSidebar";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <LightLine />
      <div className="frcsb w100 container py-6 gap-6">
        {/* left sidebar */}
        <LeftSidebar
          username="Damian"
          desc="I'm a full stack developer, I like to make things."
        />
        {/* middle scroll */}
        <MiddleSection />
        {/* right sidebar */}
        <RightSidebar />
      </div>
    </>
  );
};

export default page;
