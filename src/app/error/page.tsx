import { PageProps } from "@/types/page.types";

const page = ({ searchParams }: PageProps) => {
  return (
    <div className="w-screen h-screen fccc">
      <h2>Error</h2>
      <p>{searchParams?.error}</p>
    </div>
  );
};

export default page;
