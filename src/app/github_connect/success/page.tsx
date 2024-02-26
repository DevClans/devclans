import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success - Github",
};

const page = () => {
  return (
    <div className="mt-7">
      <h2>Success : GitHub Data Updated 👍!</h2>
      <p className="mt-1">
        {`"If you don't see the changes`}, please try reloading{" "}
        <b>the form page</b>.
      </p>
    </div>
  );
};

export default page;
