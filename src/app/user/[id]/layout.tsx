import { LightLine } from "@/components";
import LeftSidebar from "@/components/userPage/LeftSidebar";
import MiddleSection from "@/components/userPage/MiddleSection";
import RightSidebar from "@/components/userPage/RightSidebar";
import selectUserUsername from "@/lib/selectUserUsername";
import { UserProps } from "@/types/mongo/user.types";
import { PageProps } from "@/types/page.types";
import { Fetch } from "@/utils/fetchApi";

const layout = async ({
  params,
  children,
  searchParams,
}: { params: { id: string } } & PageProps & React.PropsWithChildren) => {
  const { id } = params;
  const userData: UserProps = await Fetch({
    endpoint: `/user/${id}`,
  });
  console.log("user data", userData);
  if (
    !userData ||
    (userData && ("error" in userData || "message" in userData))
  ) {
    return <div>user not found</div>;
  }
  const username = selectUserUsername({ userProps: userData });
  return (
    <>
      <LightLine />
      <LeftSidebar {...userData} searchParams={searchParams} />
      <div className="frfssb peer-data-[state=not-active]:pl-[120px] peer-data-[state=active]:pl-[340px] relative -z-10 w100 container py-6 gap-6">
        {/* middle scroll */}
        <MiddleSection
          params={params}
          username={username}
          questions={userData.questions}
        >
          {children}
        </MiddleSection>
        {/* right sidebar */}
        <RightSidebar />
      </div>
    </>
  );
};

export default layout;
