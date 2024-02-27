import FormNewProject from "@/components/FormNewProject";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";

export const metadata: Metadata = generateCommonMetadata({
  title: "Create Project",
  urlEndpoint: "/project/new",
});

export default function NewProject() {
  return <FormNewProject />;
}
