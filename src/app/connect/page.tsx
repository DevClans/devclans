import FormConnect from "@/components/FormConnect";
import { generateCommonMetadata } from "@/utils/generateMetadata";
import { Metadata } from "next";
const description =
  "Want to give an suggestion? report a bug? or even talk to us regarding anything? Fill out the form and we will reply within 48hrs.";
const title = "Connect";
export const metadata: Metadata = generateCommonMetadata({
  title,
  description,
  urlEndpoint: "/connect",
});

const page = () => {
  return (
    <>
      <FormConnect />
    </>
  );
};

export default page;
