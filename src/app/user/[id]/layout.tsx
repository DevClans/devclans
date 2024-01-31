import { LightLine } from "@/components";
import { PageProps } from "@/types/page.types";

const layout = async ({
  children,
}: { params: { id: string } } & PageProps & React.PropsWithChildren) => {
  return (
    <>
      <LightLine />
      <div className="fcc container relative -z-10 gap-6 py-6 w100">
        {children}
      </div>
    </>
  );
};

export default layout;
