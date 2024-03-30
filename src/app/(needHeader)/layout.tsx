import { Header, LightRays } from "@/components";

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <LightRays />
      {children}
    </>
  );
};

export default layout;
