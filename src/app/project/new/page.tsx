import FormNewProject from "@/components/FormNewProject";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Project",
  openGraph: {
    title: "Create Project",
  },
  twitter: {
    title: "Create Project",
  },
};

export default function NewProject() {
  return <FormNewProject />;
}
