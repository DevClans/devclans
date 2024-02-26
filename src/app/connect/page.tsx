import FormConnect from "@/components/FormConnect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  openGraph: {
    title: "Connect",
  },
  twitter: {
    title: "Connect",
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
