import FormConnect from "@/components/FormConnect";
import { Metadata } from "next";
const description =
  "Want to give an suggestion? report a bug? or even talk to us regarding anything? Fill out the form and we will reply within 48hrs.";
const title = "Connect";
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

const page = () => {
  return (
    <>
      <FormConnect />
    </>
  );
};

export default page;
