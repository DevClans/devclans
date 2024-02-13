import { PageProps } from "@/types/page.types";

const page = ({ searchParams }: PageProps) => {
  const error = searchParams?.error;
  if (error) {
    return (
      <div className="w-screen h-screen fccc gap-2">
        <h3>Try Again Later</h3>
        <p>Error: {error}</p>
      </div>
    );
  }
  return <></>;
};

export default page;
