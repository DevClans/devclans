import { PageProps } from "@/types/page.types";
import { redirect } from "next/navigation";

const page = async ({ params, searchParams }: PageProps) => {
  return redirect("/explore/projects");
};

export default page;
