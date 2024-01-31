import { LightLine } from "@/components";

const layout = async ({ children }: React.PropsWithChildren) => {
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
